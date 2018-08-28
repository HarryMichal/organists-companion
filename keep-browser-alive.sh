#!/bin/bash

echo "Checking if Google Chrome / Chromium is running."
isChromeRunning=$(ps ax | grep -v grep | grep google-chrome | awk '{print $1}')
isChromiumRunning=$(ps ax | grep -v grep | grep chromium-browser | awk '{print $1}')

if [ "$isChromeRunning" ]
then
	echo "Google Chrome is running. Exiting the script."
	exit
else
	if [ "$(dpkg-query -l google-chrome)" ]
	then
		echo "Google Chrome is installed. Launching Google Chrome."
		eval "google-chrome --app=http://ciselnik.local/output && sleep 15 && xdotool key F11"
		exit
	fi
fi

if [ "$isChromiumRunning" ]
then
	echo "Chromium is running. Exiting the script."
	exit
else
	if [ "$(dpkg-query -l chromium)" ] || [ "$(dpkg-query -l chromium-browser)" ]
	then
		echo "Chromium is installed. Launching Chromium."
		eval "chromium-browser -app=http://ciselnik.local/output & sleep 15 && xdotool key F11"
		exit
	fi
fi
