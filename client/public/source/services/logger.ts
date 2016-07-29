export const logger = {
    log: function(...args) {
        let _o = args.length > 1 ? args.join('\n') : args;
        console ? console.log(_o) : '';
    },
    error: function(...args) {
        console ? console.error(args) : '';
    }
}