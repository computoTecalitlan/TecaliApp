import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CardItem, CheckBox } from 'native-base';

export default class CustomQuestion extends Component {

    state = {
        survey: [],
        selected1: false,
        selected2: false,
        selected3: false,
        prueba: ''
    }

    answerCheckedHandler = (answer, indexCheckBox) => {
        if (indexCheckBox === '1') {
            this.setState({ selected1: true, prueba: answer })
        }
        switch (indexCheckBox) {
            case '1':
                this.setState({ selected1: true, selected2: false, selected3: false, prueba: answer })
                break;
            case '2':
                this.setState({ selected1: false, selected2: true, selected3: false, prueba: answer })
                break;
            case '3':
                this.setState({ selected1: false, selected2: false, selected3: true, prueba: answer })
                break;

            default:
                break;
        }
    }

    render() {

        let body = inc1 = inc2 = inc3 = null;

        if (this.props !== null) {

            inc1 = (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{"1.- " + this.props.inc1}</Text>
                    <TouchableOpacity
                        onPress={() => this.answerCheckedHandler(this.props.inc1, '1')}
                        style={{ marginTop: 2.5, marginBottom: 2.5, marginRight: 10 }}
                        hitSlop={styles.hitSlop} >
                        <CheckBox
                            onPress={() => this.answerCheckedHandler(this.props.inc1, '1')}
                            checked={this.state.selected1} />
                    </TouchableOpacity>
                </View>
            );
            inc2 = (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{"2.- " + this.props.inc2}</Text>
                    <TouchableOpacity
                        onPress={() => this.answerCheckedHandler(this.props.inc2, '2')}
                        style={{ marginTop: 2.5, marginBottom: 2.5, marginRight: 10 }}
                        hitSlop={styles.hitSlop} >
                        <CheckBox
                            onPress={() => this.answerCheckedHandler(this.props.inc2, '2')}
                            checked={this.state.selected2} />
                    </TouchableOpacity>
                </View>
            );
            inc3 = (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{"3.- " + this.props.inc3}</Text>
                    <TouchableOpacity
                        onPress={() => this.answerCheckedHandler(this.props.inc3, '3')}
                        style={{ marginTop: 2.5, marginBottom: 2.5, marginRight: 10 }}
                        hitSlop={styles.hitSlop} >
                        <CheckBox
                            onPress={() => this.answerCheckedHandler(this.props.inc3, '3')}
                            checked={this.state.selected3} />
                    </TouchableOpacity>
                </View>
            );
            body = (
                <CardItem>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                        {inc1}
                        {inc2}
                        {inc3}
                        <Text>{"Answer: "+this.state.prueba+", Send: "+this.props.sendSurvey}</Text>
                    </View>
                </CardItem>
            );

        }

        return (
            <View>
                {body}
            </View>
        );
    }
}



styles = StyleSheet.create({
    hitSlop: {
        top: 8,
        bottom: 8,
        left: 10,
        right: 10,
    }
})