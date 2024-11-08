import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableDataReducerAndAction'

export default configureStore({
  reducer: {
    table: tableReducer
  },
})

