import React from "react";
import {Animated, Easing, StyleSheet, Text, View} from "react-native";
import Tab from "./Tab";

interface Props {
    tabs: string[],
    onSelect?: (index: string) => void
}

interface State {
    data: string[],
    activeIndex: number | null,
    performPosition: Animated.Value,
    performWidth: Animated.Value
}

export class Selector extends React.PureComponent<Props, State> {
    private tabRefs: Array<View | null> = [];
    private performView: View | null = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            data: [],
            activeIndex: null,
            performPosition: new Animated.Value(0),
            performWidth: new Animated.Value(0),
        };
    }

    setActive = (index: number): void => {
        const {tabs, onSelect} = this.props;

        this.state.performPosition.stopAnimation();
        this.state.performWidth.stopAnimation();

        if (index < 0 || index >= tabs.length || this.tabRefs[index] == null || this.performView == null) {
            return;
        }

        if (onSelect) {
            onSelect(tabs[index]);
        }

        // @ts-ignore
        this.tabRefs[index].measure((x, y, width, height) => {
            // @ts-ignore
            this.performView.setNativeProps({height: height + 10});
            if (index == this.state.activeIndex) {
                Animated.parallel([
                    Animated.timing(
                        this.state.performPosition,
                        {
                            toValue: x + width / 2,
                            duration: 60,
                        }
                    ),
                    Animated.timing(
                        this.state.performWidth,
                        {
                            toValue: 0,
                            duration: 60,
                        }
                    )]).start();
                this.setState({activeIndex: null});
                return;
            } else {
                Animated.parallel([
                    Animated.timing(
                        this.state.performPosition,
                        {
                            toValue: x - 8,
                            easing: Easing.elastic(2),
                            duration: 300,
                        }
                    ),
                    Animated.timing(
                        this.state.performWidth,
                        {
                            toValue: width + 16,
                            duration: 80,
                        }
                    )]).start();
                this.setState({activeIndex: index});
            }
        });
    };


    //// render

    renderTab = (index: number) => {
        const {tabs} = this.props;
        const {activeIndex} = this.state;
        return (
            <View ref={tab => this.tabRefs[index] = tab}>
                <Tab
                    key={`tab_${index}`}
                    index={index}
                    text={tabs[index]}
                    onSelect={this.setActive}
                    isActive={index == activeIndex}
                />
            </View>
        );
    };

    render() {
        const {tabs} = this.props;
        const {performPosition, performWidth, activeIndex} = this.state;

        return (
            <View style={{marginTop: 20}}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    {tabs.map((text, index) => this.renderTab(index))}
                </View>
                <Animated.View
                    ref={(ref: View) => this.performView = ref}
                    style={[styles.performContainer, {left: performPosition, width: performWidth}]}
                    pointerEvents={'none'}
                >
                    <Text style={{color: 'white'}}>{activeIndex ? tabs[activeIndex] : ''}</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    performContainer: {
        backgroundColor: '#54B3D4',
        borderRadius: 6,
        position: 'absolute',
        flex: 1,
        marginTop: -5,
        shadowColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        shadowOpacity: .25,
        shadowOffset: {width: 0, height: 4}
    }
});
