## Running the app
The app is divided into an Api and Ui
### Api:
You need to have the docker daemon running on your machine for the api to work then:<br>
`cd Api` <br>
`yarn`<br>
`yarn start`<br>
To test:<br>
`yarn test` 

### Ui:
`cd checkin-ui` <br>
`yarn`<br>
`yarn start`<br>


## Improvements and considerations
With the time I spent on the app (around a days work) I focused on functionality and making it extensible and easy to change.
As a result I spent less time on styling so this would be a good next area to focus on.
Other considerations:
- The sql store could be improved by using SQL functions and doing more of the work in the db rather than in memory
- I've used a fake user Id as this is how I imagine the feature would fit into an existing app
- The two directories depend on each other to reduce duplication. This isn't ideal - using GraphQl vs Rest may aid in this
