node xml-config
===================
Handles simple xml configuration files.

----------
Installation
-------------

    npm install xml-config

Usage
-------------

Consider the following configuration file:

**config.xml**

    <config>
	<name>Jonh Doe</name>
	<location>USA</location>
	</config>


Say you want to read the **name** node from this file. Do as following:

    var XMLConfig = require('xml-config');
    var name;
    var cfg_file = new XMLConfig("config.xml");
    cfg_file.readConfig("name", function(value){
	    name = value;
    }
   Voilà! Now, you may want to update the location:
   
    var XMLConfig = require('xml-config');
    var cfg_file = new XMLConfig("config.xml");
    cfg_file.updateConfig("location", "Canada");
   
   Simple as that.

