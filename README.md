# Slack Kickerbot

Change

A german bot for slack to manage an upcoming table football session.

## Options in Slack
When you added the bot to slack with a name like "kicker", you have the following options.
### Register for the next session
```
/kicker +1
```
Immediately after four players are registered, they get a notification to go to the table.
They also get a warning, if a session has started in the last half hour.
### Unregister for the next session
```
/kicker -1
```
### List all registered users for the next session
```
/kicker list
```
### Clear the list of registred users
```
/kicker reset
```
### Get help
```
/kicker help
```

## Setup to run server locally
### Install all dependencies
```
npm install
```
### Start local server
```
npm start
```

## Hosting kickerbot on OpenShift Gear

Add Custom Environment Variables to OpenShift Gear

Example: NODE_PATH=${OPENSHIFT_HOMEDIR}app-root/repo/config:${OPENSHIFT_HOMEDIR}app-root/repo/app/controllers

	 echo -n ${OPENSHIFT_HOMEDIR}app-root/repo/config:${OPENSHIFT_HOMEDIR}app-root/repo/app/controllers > ~/.env/user_vars/NODE_PATH


