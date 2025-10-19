# Bluetooth Battery Monitor for Streamdeck

This plugin is used to show the battery % of bluetooth devices
Using [Bluetooth Battery Monitor](https://www.bluetoothgoodies.com/)

![Bluetooth Battery Monitor for Streamdeck](docs/images/example.png)

![Bluetooth Battery Monitor for Streamdeck](docs/images/Animation.gif)

## Download

You can get the latest plugin release from the [releases page](https://github.com/Skulldorom/Bluetooth-Battery-Streamdeck/releases/latest)

## Requirements

- Paid version of the app is required
- Bluetooth Battery Monitor API enabled

### Enabling Bluetooth Battery Monitor API

The official [Documentation](https://www.bluetoothgoodies.com/info/battery-monitor-api/) from the developer

- Version used for Bluetooth Battery Monitor 2.22.0.1.

# Enabling the Bluetooth Battery Monitor API on Port 9876

Follow these steps to enable the API server for Bluetooth Battery Monitor, listening on port **9876**.

---

## 1. Open Registry Editor

- Press `Win + R`, type `regedit`, and press **Enter**.

---

## 2. Navigate to the Registry Key
Go to:
HKEY_CURRENT_USER\Software\Luculent Systems\Bluetooth Battery Monitor\ApiServer


> **Tip:** If any key in this path does not exist, right-click the parent key, choose **New > Key**, and name it accordingly.

---

## 3. Add or Edit API Settings

Within the `ApiServer` key:

### a. **Add/Edit the "port" Entry**
- Right-click on the right pane, select **New > DWORD (32-bit) Value**.
- Name it: `port`
- Double-click `port`, set the **Base** to `Decimal`, and the **Value** to `9876`.
- Click **OK**.

### b. (Optional) **Add/Edit the "ip" Entry**
- Right-click, select **New > String Value**.
- Name it: `ip`
- Double-click `ip` and set its value to: `127.0.0.1`
- Click **OK**.

---

## 4. Restart Bluetooth Battery Monitor

- Exit the Bluetooth Battery Monitor app (`BattMonUI.exe`) completely.
- Start it again to apply the new settings.

## Default Configuration

- API URL: `http://127.0.0.1:9876/devices`
- Device Number: 0
- Device Name: NONE
- Refresh Interval: 5 Minutes
- Animation Speed: 400ms

## Battery Icons

<p float="left">
	<img src="com.skulldorom.bluetoothbattery.sdPlugin\imgs\actions\battery\Empty.png" alt="empty" width="50">
	<img src="com.skulldorom.bluetoothbattery.sdPlugin\imgs\actions\battery\Low.png" alt="low" width="50">
	<img src="com.skulldorom.bluetoothbattery.sdPlugin\imgs\actions\battery\One.png" alt="one quarter" width="50">
	<img src="com.skulldorom.bluetoothbattery.sdPlugin\imgs\actions\battery\Half.png" alt="half" width="50">
	<img src="com.skulldorom.bluetoothbattery.sdPlugin\imgs\actions\battery\Three.png" alt="three quarter" width="50">
	<img src="com.skulldorom.bluetoothbattery.sdPlugin\imgs\actions\battery\Full.png" alt="full" width="50">
<p float="left">

## Have Ideas or questions?

Head over to the [Discussions](https://github.com/Skulldorom/Bluetooth-Battery-Streamdeck/discussions)

# Troubleshooting

### API error

- If you are using a custom url please make sure it is correct
- If you are using the default ulr please paste the following into your browser and see if it returns a JSON `http://127.0.0.1:9876/devices`

### Device not found

Please check the device number is correct

### Recources

- [Maker CLI (Beta)](https://github.com/elgatosf/cli)
