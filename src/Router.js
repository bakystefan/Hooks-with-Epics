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
