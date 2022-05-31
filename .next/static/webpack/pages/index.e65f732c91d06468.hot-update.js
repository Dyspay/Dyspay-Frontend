"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./abi/Factory.json":
/*!**************************!*\
  !*** ./abi/Factory.json ***!
  \**************************/
/***/ (function(module) {

module.exports = JSON.parse('{"_format":"hh-sol-artifact-1","contractName":"Factory","sourceName":"contracts/Factory.sol","abi":[{"inputs":[{"internalType":"contract IGnosisSafeProxyFactory","name":"_PROXY_FACTORY","type":"address"},{"internalType":"address","name":"_MASTER_COPY","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"groupAddress","type":"address"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"groupName","type":"string"},{"indexed":false,"internalType":"string","name":"groupSymbol","type":"string"},{"indexed":false,"internalType":"address","name":"depositToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"depositEndDate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositLimit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxMembers","type":"uint256"},{"indexed":false,"internalType":"address","name":"treasureAddress","type":"address"}],"name":"NewGroup","type":"event"},{"inputs":[{"internalType":"address[]","name":"_gnosisowners","type":"address[]"},{"internalType":"string","name":"_groupName","type":"string"},{"internalType":"string","name":"_groupSymbol","type":"string"},{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_depositEndDate","type":"uint256"},{"internalType":"uint256","name":"_depositLimit","type":"uint256"},{"internalType":"uint256","name":"_maxMembers","type":"uint256"}],"name":"createGroup","outputs":[{"internalType":"address","name":"groupAddress","type":"address"},{"internalType":"address","name":"safeAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"}],"linkReferences":{},"deployedLinkReferences":{}}');

/***/ })

});