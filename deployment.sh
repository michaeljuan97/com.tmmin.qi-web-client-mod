#!/bin/bash

clear
cd /home/fs/Downloads/web-client/
sudo /greengrass/v2/bin/greengrass-cli deployment create --remove "com.tmmin.qi-web-client"
gdk component build
sudo /greengrass/v2/bin/greengrass-cli deployment create   --recipeDir /home/fs/Downloads/web-client/greengrass-build/recipes   --artifactDir /home/fs/Downloads/web-client/greengrass-build/artifacts   --merge "com.tmmin.qi-web-client=1.0.0"


#sudo /greengrass/v2/bin/greengrass-cli component restart --names="com.tmmin.qi-web-client"

#sudo /greengrass/v2/bin/greengrass-cli component list | grep Name


# sudo tail -f /greengrass/v2/logs/com.tmmin.qi-web-client.log
# sudo tail -f /greengrass/v2/logs/aws.greengrass.StreamManager.log