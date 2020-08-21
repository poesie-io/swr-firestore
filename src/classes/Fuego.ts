import * as firebase from 'firebase/app'
import ReactNativeFirebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

// import 'firebase/firestore'
// import 'firebase/auth'
// import 'firebase/functions'

type Config = Parameters<typeof firebase.initializeApp>[0]

interface ConfixExtend extends Config {
  useNativeDriver?: boolean
}


export class Fuego {
  public db: ReturnType<firebase.app.App['firestore']>
  public auth: typeof firebase.auth
  public functions: typeof firebase.functions

  constructor(config: ConfixExtend) {

    if(config.useNativeDriver){
      // @ts-ignore
      const admin =  !ReactNativeFirebase.apps.length
      ? ReactNativeFirebase.initializeApp(config)
      : ReactNativeFirebase.app()

      // @ts-ignore
      this.db = firestore()
      // @ts-ignore
      this.auth = auth()
      // @ts-ignore
      this.functions = functions()

    } else {
      this.db = !firebase.apps.length
      ? firebase.initializeApp(config).firestore()
      : firebase.app().firestore()
      this.auth = firebase.auth
      this.functions = firebase.functions
    }
  }
}
