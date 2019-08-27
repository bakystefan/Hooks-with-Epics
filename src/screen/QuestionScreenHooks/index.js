import React, {useEffect, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
/* Packages */
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckBox from 'react-native-check-box';
/* Actions */
import {getAnswers, finished} from '../../redux/quizState';

const mainActions = {
  getAnswersAction: getAnswers,
  finishedAction: finished,
};

const QuestionsScreenHooks = ({navigation: {navigate}}) => {
  // eslint-disable-next-line prettier/prettier
  const {getAnswersAction, finishedAction} = useActions(mainActions);
  const {questions, answersNumber} = useSelector(({quizState}) => quizState);

  // prevProps
  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }
  // const prevAnswer = usePrevious({answersNumber});

  useEffect(() => {
    if (questions.length === answersNumber) {
      finishedAction();
      navigate('LastScreen');
    }
  }, [questions, answersNumber, navigate, finishedAction]);

  function renderQuestion(question, key, isCheckedTrue, isCheckedFalse) {
    return (
      <View style={styles.questionWrapper} key={key}>
        <Text style={styles.questionText}>
          {`${key + 1} ${decodeURIComponent(question)}`}
        </Text>
        <View style={styles.rowQuestion}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              getAnswersAction(key, true, 'Yes');
            }}
            isChecked={isCheckedTrue}
            rightText="Yes"
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              getAnswersAction(key, false, 'No');
            }}
            isChecked={isCheckedFalse}
            rightText="No"
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.conainer}>
      <Text>Good luck</Text>
      {questions.map((item, key) =>
        renderQuestion(
          item.question,
          key,
          item.isCheckedTrue,
          item.isCheckedFalse,
        ),
      )}
    </ScrollView>
  );
};

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
    textAlign: 'center',
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

function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      console.log('dispathc', dispatch, deps);
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [dispatch, ...deps] : [dispatch],
  );
}

export default QuestionsScreenHooks;
