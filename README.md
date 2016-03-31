Add Custom Environment Variables to OpenShift Gear
==================================================

Example: NODE_PATH=${OPENSHIFT_HOMEDIR}app-root/repo/config:${OPENSHIFT_HOMEDIR}app-root/repo/app/controllers

	 echo -n ${OPENSHIFT_HOMEDIR}app-root/repo/config:${OPENSHIFT_HOMEDIR}app-root/repo/app/controllers > ~/.env/user_vars/NODE_PATH


