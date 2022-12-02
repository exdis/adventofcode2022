import { readdirSync } from 'fs'
import inquirer from 'inquirer';
import clap from 'clap';

const directories = readdirSync(__dirname, { withFileTypes: true })
    .filter(item => item.isDirectory() && item.name.startsWith('day'))
    .map(item => ({ name: item.name, value: item.name.replace(/^day/, '') }));

const runDay = day => {
    try {
        require(`./day${day}`).run();
    } catch (err) {
        console.error('Error: wrong day!');
        process.exit(1);
    }
}

const command = clap.command('default')
    .option('-d --day <day>', 'Run specific day', value => Number(value))
    .description('Advent of code solutions')

    .action(({ options }) => {
        if (!options.day) {
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'day',
                    message: 'Choose the day',
                    choices: directories
                }
            ])
            .then(answers => {
                runDay(answers.day)
            })
        } else {
            runDay(options.day);
        }
    });

command.run();

