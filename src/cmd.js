import commander from 'commander';
import config from './package.json';
import encode from './encode';
import decode from './decode';

commander
   .usage('script-arts [command]');

commander
   .version(config.version);

commander
  .command('encode <script> [output]')
  .option('-e, --extension <extension>', 'output image extension png, jpg, gif')
  .option('-i, --iterator <iterator>', 'encode iterator')
  .option('-t, --theme <theme>', 'encode theme')
  .option('-d, --delta <delta>', 'chart code + delta. If encoded with delta -'
    + 'decode should be with same delta value')
  .description('encode scripts into images')
  .action(encode);

commander
  .command('decode <image> [output]')
  .description('decode images into originals')
  .option('-d, --delta <delta>', 'chart code - delta')
  .action(decode);

module.exports = () => {
  commander.parse(process.argv);
};
