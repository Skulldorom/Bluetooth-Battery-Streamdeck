import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { BluetoothBatteryAction } from "./actions/battery";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);

// Register the battery action.
streamDeck.actions.registerAction(new BluetoothBatteryAction());

// Finally, connect to the Stream Deck.
streamDeck.connect();
