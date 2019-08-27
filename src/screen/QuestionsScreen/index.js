import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
/* Packages */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckBox from 'react-native-check-box';
/* Actions */
import {getAnswers, finished} from '../../redux/quizState';

const mainActions = {
  getAnswersAction: getAnswers,
  finishedAction: finished,
};

class QuestionsScreen extends Component {
  componentDidUpdate(prevProps) {
    const {questions, answersNumber} = this.props;
    if (questions.length === answersNumber) {
      const {
        navigation: {navigate},
        finishedAction,
      } = this.props;
      finishedAction();
      navigate('LastScreen');
    }
  }

  renderQuestion = (question, key, isCheckedTrue, isCheckedFalse) => (
    <View style={styles.questionWrapper} key={key}>
      <Text style={styles.questionText}>
        {`${key + 1} ${decodeURIComponent(question)}`}
      </Text>
      <View style={styles.rowQuestion}>
        <CheckBox
          style={styles.checkBox}
          onClick={() => this.props.getAnswersAction(key, true, 'Yes')}
          isChecked={isCheckedTrue}
          rightText="Yes"
        />
        <CheckBox
          style={styles.checkBox}
          onClick={() => this.props.getAnswersAction(key, false, 'No')}
          isChecked={isCheckedFalse}
          rightText="No"
        />
      </View>
    </View>
  );

  render() {
    const {questions} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.conainer}>
        <Text>Good luck</Text>
        {questions.map((item, key) =>
          this.renderQuestion(
            item.question,
            key,
            item.isCheckedTrue,
            item.isCheckedFalse,
          ),
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  questionText: {
    color: 'black',
    textAlign: 'center'
  },
  checkBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowQuestion: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default connect(
  ({quizState}) => ({
    questions: quizState.questions,
    answersNumber: quizState.answersNumber,
  }),
  dispatch => bindActionCreators(mainActions, dispatch),
)(QuestionsScreen);
