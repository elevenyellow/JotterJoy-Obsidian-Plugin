import { App, PluginSettingTab, Setting } from 'obsidian'
import type JotterJoyPlugin from './Plugin'

export const DEFAULT_SETTINGS: JotterJoyPluginSettings = {
	apiUrl: 'http://127.0.0.1:8000/',
	frontmatterPropertyName: 'tags',
	model: 'groq:llama3-8b-8192'
}

export const JOTTER_JOY_MODELS = {
	'groq:llama3-8b-8192': 'Groq Llama3 8 Billion',
	'groq:llama3-70b-8192': 'Groq Llama3 70 Billion'
}

export interface JotterJoyPluginSettings {
	apiUrl: string
	frontmatterPropertyName: string
	model: keyof typeof JOTTER_JOY_MODELS
}

export class JotterJoySettingsTab extends PluginSettingTab {
	plugin: JotterJoyPlugin

	constructor(app: App, plugin: JotterJoyPlugin) {
		super(app, plugin)
		this.plugin = plugin
	}

	display(): void {
		const { containerEl } = this

		containerEl.empty()

		new Setting(containerEl)
			.setName('API URL')
			.setDesc('A compatible JotterJoy API URL.')
			.addExtraButton((button) => {
				button.setIcon('undo-2')
				button.setTooltip('Reset to default URL')
				button.onClick(async () => {
					this.plugin.settings.apiUrl = DEFAULT_SETTINGS.apiUrl
					await this.plugin.saveSettings()
					this.display()
				})
			})
			.addText((text) =>
				text
					.setPlaceholder('Enter an URL')
					.setValue(this.plugin.settings.apiUrl)
					.onChange(async (value) => {
						if (this.isUrlValid(value)) {
							this.plugin.settings.apiUrl = value
							await this.plugin.saveSettings()
						}
					})
			)

		new Setting(containerEl)
			.setName('LLM Model')
			.setDesc('Choose the model you want suggestions from.')

			.addDropdown((dropdown) =>
				dropdown
					.addOptions(JOTTER_JOY_MODELS)
					.setValue(this.plugin.settings.model)
					.onChange(async (value) => {
						this.plugin.settings.model = value as keyof typeof JOTTER_JOY_MODELS
						await this.plugin.saveSettings()
					})
			)

		new Setting(containerEl)
			.setName('Frontmatter property name')
			.setDesc('Frontmatter tags will be saved under this property.')
			.addText((text) =>
				text
					.setPlaceholder('Enter a property name')
					.setValue(this.plugin.settings.frontmatterPropertyName)
					.onChange(async (value) => {
						this.plugin.settings.frontmatterPropertyName = value
						await this.plugin.saveSettings()
					})
			)
	}

	private isUrlValid(url: string): boolean {
		const webUrlRegex = new RegExp(
			'^' +
				// protocol identifier (optional)
				// short syntax // still required
				'(?:(?:(?:https?|ftp):)?\\/\\/)' +
				// user:pass BasicAuth (optional)
				'(?:\\S+(?::\\S*)?@)?' +
				'(?:' +
				// IP address exclusion
				// private & local networks
				'(?!(?:10)(?:\\.\\d{1,3}){3})' +
				'(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
				'(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
				// IP address dotted notation octets
				// excludes loopback network 0.0.0.0
				// excludes reserved space >= 224.0.0.0
				// excludes network & broadcast addresses
				// (first & last IP address of each class)
				'(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
				'(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
				'(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
				'|' +
				// host & domain names, may end with dot
				// can be replaced by a shortest alternative
				// (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
				'(?:' +
				'(?:' +
				'[a-z0-9\\u00a1-\\uffff]' +
				'[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
				')?' +
				'[a-z0-9\\u00a1-\\uffff]\\.' +
				')+' +
				// TLD identifier name, may end with dot
				'(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
				')' +
				// port number (optional)
				'(?::\\d{2,5})?' +
				// resource path (optional)
				'(?:[/?#]\\S*)?' +
				'$',
			'i'
		)
		return webUrlRegex.test(url)
	}
}
