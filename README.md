# Animated selector for React Native 
![](https://img.shields.io/npm/types/typescript.svg)


A ```<Selector/>``` component for react native projects. 
Work like RadioButton. 

*Support left & right swipe on tabs for selecting option*

![Example](https://github.com/a-shabanov/rn-animate-selector/blob/master/example/selector.gif?raw=true)
![Example-Orange](https://github.com/a-shabanov/rn-animate-selector/blob/master/example/selector-orange.gif?raw=true)

## Add it to your project



### npm
```
npm install @nexcella/rn-animated-selector
```

### yarn
```
yarn add @nexcella/rn-animated-selector
```


## Usage

```
<Selector tabs={['Option 1', 'Option 2', 'Option 3']}/>
```

### Props:


| Prop | Type | Required |Description |
|--|--|--|--|
| tabs | String[]| yes | List of options |
| color | String | no | Background color for active tab |
| onSelect | (tab: string) => void | no | Callback for tab`s selecting |


## Licence

License is ISC
