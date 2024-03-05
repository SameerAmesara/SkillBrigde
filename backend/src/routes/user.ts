import express from 'express'
import userService from '../services/userService'
import toNewUserEntry from '../utils/parser'
import logger from '../utils/logger'

const userRouter = express.Router()

userRouter.get('/', (_request, response) => {
  userService.getAll().then(users => response.send(users))
    .catch(
      error => logger.error("Unable to fetch users", error)
    )
})

userRouter.post('/', (request, response) => {
  const newUserEntry = toNewUserEntry(request.body);
  userService.addUser(newUserEntry)
    .then(
      addedEntry => response.json(addedEntry)
    ).catch(
      error => logger.error("Unable to add user", newUserEntry, error)
    )
})

export default userRouter