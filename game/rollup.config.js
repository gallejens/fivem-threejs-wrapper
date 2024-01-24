import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from "rollup-plugin-ts";

const ENTRY_POINTS = [
  {
    inputPath: 'src\\client\\index.ts',
    outputFileName: 'client.js'
  },
  {
    inputPath: 'src\\server\\index.ts',
    outputFileName: 'server.js'
  }
]

export default {
	input: ENTRY_POINTS.map((entryPoint) => entryPoint.inputPath),
	output: {
    dir: 'dist',
		format: 'cjs',
    entryFileNames: (chunk) => {
      for (const { inputPath, outputFileName } of ENTRY_POINTS) {
        if (chunk.facadeModuleId.endsWith(inputPath)) {
          return outputFileName
        }
      }
      throw new Error('Invalid entry file name')
    }
	},
	plugins: [
		resolve(),
		commonjs(),
    ts()
	]
};