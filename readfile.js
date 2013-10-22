/**
Copyright (C) 2013 Moko365 Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// public modules
var util = require('util');
var fs = require('fs');
var reader = require ("buffered-reader");
var DataReader = reader.DataReader;

// the file list
var files = [];

/**
 * Use BufferedReader to read text file line by line.
 *
 * See: https://github.com/Gagle/Node-BufferedReader
 */
var getFilelist = function(path, cb) {
    new DataReader (path + 'index.txt', { encoding: "utf8" })
        .on ("error", function (error){
            console.log (error);
        })
        .on ("line", function (line, nextByteOffset){
            files.push({
                filename: line
            });
        })
        .on ("end", function (){
            cb(files);
        })
        .read();
};

// Application
getFilelist('manuscript/', function(files) {
    for (var i = 0; i < files.length; i++) {
    	var filename = 'manuscript/' + files[i].filename;

        fs.readFile(filename, 'utf8', function(err, data) {
    	    console.log("[DATA] " + data);
    	});
    }
});