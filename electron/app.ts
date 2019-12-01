import { app } from 'electron';
import Main from './windows/main';

const main = new Main();

// Make the app a single instance app.
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (main.window!) {
      if (main.window!.isMinimized()) {
        main.window!.restore();
      }
      main.window!.focus();
    }
  });
  app.on('ready', main.init);
}

app.on('activate', () => {
  if (main.window === null) {
    main.init();
  }
});
