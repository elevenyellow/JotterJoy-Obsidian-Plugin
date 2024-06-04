import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';


interface JotterJoyPluginSettings {
	apiUrl: string;
}

const DEFAULT_SETTINGS: JotterJoyPluginSettings = {
	apiUrl: 'http://127.0.0.1:8000/'
}

export default class JotterJoyPlugin extends Plugin {
	settings: JotterJoyPluginSettings;

	async onload() {
		// settings
		await this.loadSettings();
		this.addSettingTab(new JotterJoySettingTab(this.app, this));



		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});



		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class JotterJoySettingTab extends PluginSettingTab {
	plugin: JotterJoyPlugin;

	constructor(app: App, plugin: JotterJoyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('API URL')
			.setDesc('A compatible JotterJoy API URL')
			.addText(text => text
				.setPlaceholder('Enter an URL')
				.setValue(this.plugin.settings.apiUrl)
				.onChange(async (value) => {
					if (this.isUrlValid(value)) {
						this.plugin.settings.apiUrl = value;
						await this.plugin.saveSettings();
					}
				}));
	}

	private isUrlValid(url: string): boolean {
		const webUrlRegex =
		new RegExp(
			"^" +
				// protocol identifier (optional)
				// short syntax // still required
				"(?:(?:(?:https?|ftp):)?\\/\\/)" +
				// user:pass BasicAuth (optional)
				"(?:\\S+(?::\\S*)?@)?" +
				"(?:" +
					// IP address exclusion
					// private & local networks
					"(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
					"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
					"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
					// IP address dotted notation octets
					// excludes loopback network 0.0.0.0
					// excludes reserved space >= 224.0.0.0
					// excludes network & broadcast addresses
					// (first & last IP address of each class)
					"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
					"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
					"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
				"|" +
					// host & domain names, may end with dot
					// can be replaced by a shortest alternative
					// (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
					"(?:" +
						"(?:" +
							"[a-z0-9\\u00a1-\\uffff]" +
							"[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
						")?" +
						"[a-z0-9\\u00a1-\\uffff]\\." +
					")+" +
					// TLD identifier name, may end with dot
					"(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
				")" +
				// port number (optional)
				"(?::\\d{2,5})?" +
				// resource path (optional)
				"(?:[/?#]\\S*)?" +
			"$", "i"
		);
		return webUrlRegex.test(url);
	}
}
