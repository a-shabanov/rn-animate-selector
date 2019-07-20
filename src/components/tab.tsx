import * as React from 'react'
import {GestureResponderEvent, StyleSheet, Text, View} from "react-native";

const SWIPE_DELTA = 15;

interface Props {
    index: number,
    text: string,
    onSelect: (index: number) => void,
    isActive?: boolean
}

export default class Tab extends React.PureComponent<Props> {
    static defaultProps = {
        isActive: false
    };

    private startTouchLocation: number = 0;

    handelSelect = (index: number) => {
        this.props.onSelect(index)
    };

    /// movement
    handleTouchStart = (e: GestureResponderEvent) => {
        this.startTouchLocation = e.nativeEvent.locationX;
    };

    handleTouchEnd = (e: GestureResponderEvent) => {
        const {index, isActive} = this.props;

        const moveDelta = this.startTouchLocation - e.nativeEvent.locationX;
        if (isActive && Math.abs(moveDelta) > SWIPE_DELTA) {
            this.handelSelect(moveDelta < 0 ? index + 1 : index - 1)
        } else {
            this.handelSelect(index);
        }
        this.startTouchLocation = 0;
    };

    ////

    render() {
        const {text, isActive} = this.props;
        console.log(text, isActive);
        return (
            <View
                style={styles.container}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}>
                <Text style={{color: isActive ? 'white' : 'black'}}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 6,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        shadowColor: '#E0E0E0',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 10,
        backgroundColor: 'white'
    }
});
