import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
} from 'obsidian';



interface MobileUtilsSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MobileUtilsSettings = {
	mySetting: 'default'
}



export default class MobileUtilsPlugin extends Plugin {
	settings: MobileUtilsSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new MobileUtilsSettingTab(this.app, this));
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



class MobileUtilsSettingTab extends PluginSettingTab {
	plugin: MobileUtilsPlugin;

	constructor(app: App, plugin: MobileUtilsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}

}
