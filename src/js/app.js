import { mountShell } from './components/shell.js';
import { startRouter } from './router.js';

mountShell(document.getElementById('app'));
startRouter();
