import {
  InitScreen,
  QuestionsScreen,
  LastScreen,
  QuestionScreenHooks,
} from './screen';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const AppStack = createStackNavigator(
  {
    InitScreen: {
      screen: InitScreen,
      navigationOptions: {
        header: null,
      },
    },
    QuestionsScreen: {
      screen: QuestionsScreen,
      navigationOptions: {
        header: null,
      },
    },
    QuestionScreenHooks: {
      screen: QuestionScreenHooks,
      navigationOptions: {
        header: null,
      },
    },
    LastScreen: {
      screen: LastScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'InitScreen',
  },
);

export default createAppContainer(AppStack);
