/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM DemoTable', [], function (tx, rs) {
            var itemList = '';
            var item;

            for (var i=0; i < rs.rows.length; i++ ) {
                item = rs.rows.item(i)

                itemList += `<li>${item.name} - ${item.score}</li>\n`;
            }

            document.getElementById('list').innerHTML = itemList;

            console.log('Record count: ' + rs.rows.length);
        }, function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    });
}
