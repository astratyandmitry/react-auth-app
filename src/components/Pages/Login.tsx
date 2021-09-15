import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { LoginFormReducerAction, LoginFormReducerActionType, LoginReducerState } from '../../types'
import FormInput from '../UI/FormInput'
import AuthContext from '../../store/auth.context'

const loginFormPayload: LoginReducerState = {
  email: {
    value: '',
    isValid: null,
    validate (value: any): boolean {
      return value.toString().includes('@')
    },
  },
  password: {
    value: '',
    isValid: null,
    validate (value: any): boolean {
      return value.toString().length >= 6
    },
  },
}

const loginFormReducer = (state: LoginReducerState, action: LoginFormReducerAction) => {
  const stateFieldKey = action.field as keyof LoginReducerState

  if (action.type === LoginFormReducerActionType.CHANGE) {
    return {
      ...state,
      [action.field]: {
        ...state[stateFieldKey],
        isValid: state[stateFieldKey].validate(action.value),
        value: action.value,
      },
    }
  }

  if (action.type === LoginFormReducerActionType.BLUR) {
    return {
      ...state,
      [action.field]: {
        ...state[stateFieldKey],
        isValid: state[stateFieldKey].validate(state[stateFieldKey].value),
      },
    }
  }

  return state
}

function Login () {
  const authContext = useContext(AuthContext)

  const [loginFormState, formDispatch] = useReducer(loginFormReducer, loginFormPayload)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: LoginFormReducerActionType.CHANGE,
      field: e.target.id,
      value: e.target.value,
    } as LoginFormReducerAction)
  }

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: LoginFormReducerActionType.BLUR,
      field: e.target.id,
    } as LoginFormReducerAction)
  }

  const [formIsValid, setFormIsValid] = useState(false)
  const notInitialRender = useRef(false)

  useEffect(() => {
    if (notInitialRender.current) {
      const timeout = setTimeout(() => {
        setFormIsValid(Boolean(loginFormState.email.isValid) && Boolean(loginFormState.password.isValid))
      }, 500)

      return () => {
        clearTimeout(timeout)
      }
    } else {
      notInitialRender.current = true
    }
  }, [loginFormState.email.isValid, loginFormState.password.isValid])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formIsValid) {
      authContext.doLogin({
        email: loginFormState.email.value,
        password: loginFormState.password.value,
      })
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="w-96 mx-auto bg-gray-100 p-8 rounded">
      <div className="space-y-4">
        <FormInput
          id="email"
          label="E-mail"
          dataType="email"
          value={loginFormState.email.value}
          isValid={loginFormState.email.isValid}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />

        <FormInput
          id="password"
          label="Password"
          dataType="password"
          value={loginFormState.password.value}
          isValid={loginFormState.password.isValid}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>

      <button type="submit"
              className={`w-full block  text-white p-3 rounded mt-4 ${formIsValid ? 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700' : 'bg-gray-700'}`}>
        Log In
      </button>
    </form>
  )
}

export default Login
