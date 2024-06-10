# JotterJoy Obsidian Plugin

The JotterJoy plugin helps enhance your Obsidian experience by providing advanced features such as proof-reading and tagging. This README will guide you through the installation and configuration process.

# Prerequisites

You will need Obsidian installed in your system for this to work. You can also download Obsidian [here](https://obsidian.md/).

Currently only available in MacOS devices with M1 chips or higher. Not available on Windows OS as of now.

# Installation

### Step 1: Download the Plugin

1. Navigate to the [Jotterjoy Obsidian Plugin Repository](https://github.com/elevenyellow/JotterJoy-Obsidian-Plugin) on Github

2. Click on "Releases" located on the right side, that can also be found [here](https://github.com/elevenyellow/JotterJoy-Obsidian-Plugin/releases/tag/v0.0.2)

3. Download the latest version ```.zip``` file

<img width="1465" alt="Screenshot 2024-06-09 at 10 27 08 AM" src="https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/93e3eefd-434e-4a51-8ab4-d9ec546c11ad">

### Step 2: Install the Plugin

1. Extract the downloaded ```.zip``` file on your Download folder

2. Open Obsidian and right-click on any of your notes and click on "Reveal in Finder" to open the root directory of your Obsidian Vault

<img width="304" alt="Screenshot 2024-06-09 at 11 16 57 AM" src="https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/4e8c330b-e7b4-4a11-b627-21ea58b8bd73">

3. Open the ```.obsidian``` folder. If the folder cannot be found, press ```Command + Shift + .```. to reveal hidden folder.

<img width="753" alt="Screenshot 2024-06-09 at 11 18 29 AM (1)" src="https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/14f05069-b653-452e-ad8e-4b9424555e26">

6. Create a ```plugins``` folder if you don't have one yet.

7. Drag and drop the downloaded and extracted ```release``` folder in to the ```plugins``` folder.

<img width="915" alt="Screenshot 2024-06-09 at 11 49 33 AM" src="https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/3d8a3b46-30d7-4bbb-b302-61b34df6d090">

### Step 3: Enable the Plugin

1. In Obsidian, press  ``` `Command + p` ``` to open the search bar.

2. Type 'Settings' and open it

3. Navigate to the 'Community plugins' and click 'turn on Community plugins'
<img width="1018" alt="Screenshot 2024-06-09 at 11 20 07 AM" src="https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/e377182b-23df-47f2-88ad-ae3eb4da9c58">

4. Under "Installed plugins, enable "JotterJoy"

<img width="1017" alt="Screenshot 2024-06-09 at 11 21 09 AM" src="https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/d062c6c5-bc25-4200-88c2-18733ee40a68">

### Step 4: Configure JotterJoy

1. After enabling "JotterJoy", this Community plugins section should show up. Click on this to go to the Jotterjoy plugin settings.

![image](https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/8b42f2d0-fb10-4b7c-bdd1-69369dac3ac2)

2. Leave all settings as default except for the API key field.

3. To get an API key, visit [Grog](https://console.groq.com/keys),  create an account, and generate a key. Copy the API key.

4. Paste the API key into the Jotterjoy plugin settings in Obsidian.

<img width="1021" alt="Screenshot 2024-06-09 at 11 21 48 AM" src="https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/dfda29b7-1dfb-4863-93ab-8f9d361adb8f">

### Step 5: Download and Run the Server

1. Go to the [JotterJoy Server](https://github.com/elevenyellow/JotterJoy) repository on GitHub.

2. Download the server ```.zip``` file from the releases section.

![image](https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/42fb217d-cf96-45d5-99c6-8c446324348f)

3. Extract the ```.zip``` file, and a new file will appear in your downloads folder.

5. Open the file. If you get an error when opening the file, right-click the file and select "Open with" and select "Terminal".

6. Wait for the server to start. If you see a message indicating it is running, everything is set up correctly.

![Screenshot 2024-06-09 at 11 35 57 AM](https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/27be4e15-7240-41c0-b87f-76f1717f5e40)

This means the plugin is now ready for use.

# Using JotterJoy

![image](https://github.com/find-joyjotter/jotterjoy-docu/assets/172158723/146eebe6-9e5c-4533-89b8-6ce17c91472e)

### Proofreading Your Notes

1. In Obsidian, open the note you want to proofread.

2. Press ``` `Command + p` ```, type "JotterJoy", and select "Proofread note".

3. Wait for the note to be processed, it usually takes a few seconds. Then your note will be corrected!

### Generating Tags

1. Open the note that you want to generate tags.

2. Press ``` `Command + p` ```, type "JotterJoy", and select "Generate tags in front matter".

3. The plugin will analyze the document and add relevant tags.

### Advanced Configuration

1. Open the JotterJoy plugin settings by press  ``` `Command + p` ``` and typing Settings.

2. Under Community plugins, select JotterJoy

3. In the section LMM Model, you can select Grow Llama3 70 billion model instead of the 8 billion model for improved accuracy in proofreading and tag generation.

Do note that the 70 billion model is limited on Groq and may take longer to process.

## Conclusion

With the JotterJoy plugin, you can significantly enhance your note-taking experience in Obsidian by leveraging advanced AI features. Follow the steps outlined in this README to install, configure, and start using the plugin effectively. For more information, visit the [JotterJoy repository](https://github.com/elevenyellow/JotterJoy-Obsidian-Plugin) on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/elevenyellow/JotterJoy-Obsidian-Plugin/blob/main/LICENSE) file for details

## Acknowledgments

* Support the project by buying us [coffee](https://buy.stripe.com/eVa9D6dS92y50KseV6)
