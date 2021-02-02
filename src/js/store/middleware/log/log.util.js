const { ActionEvent, ActionCommand, ActionDocument, AsyncActionCommand } = require('../../entity');

const logFormatter = (subject) => 
     subject + ' '.repeat(9 - subject.length);

const EventLogOf = ({ sender, subject, message }) => 
    `[${sender}] ${logFormatter(subject)} |${message}|`

const CommandLogOf = ({ sender, subject, command }) => 
    `[${sender}] ${logFormatter(subject)} |${command}|`

const DocumentLogOf = ({ sender, subject, doctype }) => 
    `[${sender}] ${logFormatter(subject)} |${doctype}|`


const logCreator = (action) => {
    switch(action.constructor) {
        case AsyncActionCommand:
        case ActionCommand:
            return CommandLogOf(action);
        case ActionEvent:
            return EventLogOf(action);
        case ActionDocument:
            return DocumentLogOf(action);
    }
}

const ActionLogger = ({ logger }) => (action) => {
    logger(logCreator(action));
}

module.exports = {
    logCreator,
    ActionLogger,
    EventLogOf,
}