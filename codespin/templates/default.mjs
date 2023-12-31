import path from "path";
export default async function generate(args) {
    if (args.diff && args.promptDiff) {
        return withPromptDiff(args);
    }
    else {
        return withoutPromptDiff(args);
    }
}
function argsHasPreviousPrompt(args) {
    return args.previousPrompt !== undefined;
}
function argsHasSourceFile(args) {
    return args.sourceFile !== undefined;
}
function withPromptDiff(args) {
    if (argsHasSourceFile(args) &&
        argsHasPreviousPrompt(args) &&
        args.sourceFile.previousContents) {
        const argsWithSource = args;
        return (printLine(`The following prompt (with line numbers added) was used to generate source code for the file "${relativePath(args.sourceFile?.path)}" provided later.`, true) +
            printPreviousPrompt(args, true) +
            printSourceFile(argsWithSource, false, true) +
            printDeclarations(args) +
            printIncludeFiles(args, false, false) +
            printLine(`But now I'm making the following changes to the original prompt. The diff of the prompt is given below.`, true) +
            printPromptDiff(args) +
            printLine("Based on the changes to the prompt, regenerate the source code. Retain the original code and structure wherever possible.") +
            printFileTemplate(args));
    }
    else {
        return withoutPromptDiff(args);
    }
}
function withoutPromptDiff(args) {
    return ((args.targetFilePath
        ? printLine(`Generate source code for the file "${relativePath(args.targetFilePath)}" based on the following instructions (enclosed between "-----").`, true)
        : "") +
        (args.targetFilePath ? printLine("-----", true) : "") +
        printLine(printPrompt(args, false), args.targetFilePath ? false : true) +
        (args.targetFilePath ? printLine("-----", true) : "") +
        (argsHasSourceFile(args) ? printSourceFile(args, false, false) : "") +
        printDeclarations(args) +
        printIncludeFiles(args, false, false) +
        printFileTemplate(args));
}
function printLine(line, addBlankLine = false) {
    return line
        ? line + (!line.endsWith("\n") ? "\n" : "") + (addBlankLine ? "\n" : "")
        : "\n";
}
function printPrompt(args, useLineNumbers) {
    return printLine(useLineNumbers ? args.promptWithLineNumbers : args.prompt, true);
}
function relativePath(filePath) {
    return "./" + path.relative(process.cwd(), filePath);
}
function printPreviousPrompt(args, useLineNumbers) {
    return printLine(useLineNumbers ? args.previousPromptWithLineNumbers : args.previousPrompt, true);
}
function printPromptDiff(args) {
    return printLine(args.promptDiff, true);
}
function printFileTemplate(args) {
    const filePath = args.targetFilePath
        ? relativePath(args.targetFilePath)
        : "./some/path/filename.ext";
    const tmpl = `
  Respond with just the code (but exclude invocation examples etc) in the following format:

  $START_FILE_CONTENTS:${filePath}$
  import a from "./a";
  function somethingSomething() {
    //....
  }
  $END_FILE_CONTENTS:${filePath}$
  `;
    return printLine(fixTemplateWhitespace(tmpl), true);
}
function printSourceFile(args, useLineNumbers, usePrevious) {
    const text = printLine(usePrevious
        ? `Here is the previous code for ${relativePath(args.sourceFile.path)}${useLineNumbers ? " with line numbers" : ""}`
        : `Here is the code for ${relativePath(args.sourceFile.path)}${useLineNumbers ? " with line numbers" : ""}`) +
        printLine("```") +
        printLine(usePrevious
            ? useLineNumbers
                ? args.sourceFile.previousContentsWithLineNumbers
                : args.sourceFile.previousContents
            : useLineNumbers
                ? args.sourceFile.contentsWithLineNumbers
                : args.sourceFile.contents) +
        printLine("") +
        printLine("```", true);
    return text;
}
function printDeclarations(args) {
    if (args.declare.length === 0) {
        return "";
    }
    else {
        const text = printLine("Here are some relevant declarations/signatures for external dependencies:", true) +
            args.declare
                .map((file) => printLine(`Declarations for ${relativePath(file.path)}:`) +
                printLine("```") +
                printLine(file.contents) +
                printLine("```", true))
                .join("\n");
        return text;
    }
}
function printIncludeFiles(args, useLineNumbers, usePrevious) {
    if (args.include.length === 0) {
        return "";
    }
    else {
        const text = printLine("Including some relevant files to help you understand the context better:", true) +
            args.include
                .map((file) => printLine(`Contents of the file ${relativePath(file.path)}:`) +
                printLine("```") +
                printLine(usePrevious
                    ? useLineNumbers
                        ? file.previousContentsWithLineNumbers
                        : file.previousContents
                    : useLineNumbers
                        ? file.contentsWithLineNumbers
                        : file.contents) +
                printLine("```", true))
                .join("\n");
        return text;
    }
}
export function fixTemplateWhitespace(input) {
    // Split the string into an array of lines.
    const lines = input.split("\n");
    // Remove leading and trailing empty lines if found.
    if (lines[0].trim() === "")
        lines.shift();
    if (lines[lines.length - 1].trim() === "")
        lines.pop();
    // Identify the whitespace prior to the first non-empty line.
    const firstNonEmptyLine = lines.find((line) => line.trim() !== "");
    const leadingWhitespaceMatch = firstNonEmptyLine?.match(/^(\s+)/);
    const leadingWhitespace = leadingWhitespaceMatch
        ? leadingWhitespaceMatch[0]
        : "";
    // Subtract the whitespace from every other line, except empty lines.
    const transformedLines = lines.map((line) => {
        if (line.trim() === "")
            return line; // Return the empty line as it is.
        return line.startsWith(leadingWhitespace)
            ? line.slice(leadingWhitespace.length)
            : line;
    });
    return transformedLines.join("\n");
}
//# sourceMappingURL=default.js.map