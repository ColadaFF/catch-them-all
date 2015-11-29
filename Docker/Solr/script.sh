#!/bin/bash

set -e

appSetup () {
    mkdir /etc/cier
    touch /etc/cier/.alreadysetup
    bash install_solr_service.sh /opt/$SOLR.tgz -p 8080 -u root
    mkdir -p /var/solr/data/criminals/data/index
    chown -R 777 /var/solr/data/criminals
    curl "http://localhost:8080/solr/admin/cores?action=CREATE&name=criminals&instanceDir=criminals"
}

appStart () {
    [ -f /etc/cier/.alreadysetup ] && echo "Skipping setup..." || appSetup

    service=solr

    if (( $(ps -ef | grep -v grep | grep $service | wc -l) > 0 ))
    then
    echo "$service is running!!!"
    else
    /etc/init.d/$service start
    fi
}

appHelp () {
	echo "Available options:"
	echo " app:start          - Starts all services needed for the meteor app to start"
	echo " app:setup          - First time setup."
	echo " app:help           - Displays the help"
	echo " [command]          - Execute the specified linux command eg. /bin/bash."
}

case "$1" in
	app:start)
		appStart
		;;
	app:setup)
		appSetup
		;;
	app:help)
		appHelp
		;;
	*)
		if [ -x $1 ]; then
			$1
		else
			prog=$(which $1)
			if [ -n "${prog}" ] ; then
				shift 1
				$prog $@
			else
				appHelp
			fi
		fi
		;;
esac
exit 0
