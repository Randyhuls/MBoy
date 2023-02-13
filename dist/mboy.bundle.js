/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cpu_cpu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _gpu_gpu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _mmu_mmu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



(new class MBoy {
    constructor() {
        this.cpu = _cpu_cpu__WEBPACK_IMPORTED_MODULE_0__["CPU"].shared;
        this.gpu = _gpu_gpu__WEBPACK_IMPORTED_MODULE_1__["GPU"].shared;
        this.mmu = _mmu_mmu__WEBPACK_IMPORTED_MODULE_2__["MMU"].shared;
    }
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mmu.loadROMIntoMemory('testroms/cpu_instrs/individual/01-special.gb');
            this.mmu.gpu = this.gpu;
            this.gpu.cpu = this.cpu;
            this.gpu.mmu = this.mmu;
            this.cpu.cycle();
        });
    }
    restart() {
        this.mmu.reset();
        this.gpu.reset();
        this.cpu.reset();
    }
})
    .boot()
    .catch((err) => console.error(err));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPU", function() { return CPU; });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants_cpu_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _opcodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _audio_audio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _gpu_gpu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _mmu_mmu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);









class CPU {
    constructor() {
        this.IS_INTERRUPTED = 0x01;
        this.V_BLANK_INTERRUPT = 0x40;
        this.debug = _debug__WEBPACK_IMPORTED_MODULE_8__["Debug"].shared;
        this.clock = {
            M: 0
        };
        this.register = {
            A: 0x01, B: 0x00, C: 0x13, D: 0x00, E: 0xD8, H: 0x01, L: 0x4D, F: 0xB0,
            PC: 0x0100, SP: 0xFFFE,
        };
        this.IME = 0;
        this.halt = false;
        this.haltBug = false;
        this.opcodes = new _opcodes__WEBPACK_IMPORTED_MODULE_3__["Opcodes"](this);
        this.mmu = _mmu_mmu__WEBPACK_IMPORTED_MODULE_7__["MMU"].shared;
        this.mmu.cpu = this;
        this.debug.mmu = _mmu_mmu__WEBPACK_IMPORTED_MODULE_7__["MMU"].shared;
        this.debug.debugging = true;
        this.gpu = _gpu_gpu__WEBPACK_IMPORTED_MODULE_5__["GPU"].shared;
        this.input = new _input_input__WEBPACK_IMPORTED_MODULE_6__["Input"]();
        this.audio = new _audio_audio__WEBPACK_IMPORTED_MODULE_4__["Audio"]();
    }
    static get shared() {
        if (!this._shared)
            this._shared = new CPU();
        return this._shared;
    }
    reset() {
    }
    handleTimer() {
    }
    read8(r1) {
        return this.register[r1] & 0xFF;
    }
    read16(r1h, r1l) {
        const hb = (this.register[r1h] << 8) & 0xFF00;
        const lb = this.register[r1l] & 0x00FF;
        return (hb | lb) & 0xFFFF;
    }
    write8(value, r1) {
        this.register[r1] = value & 0xFF;
    }
    write16(value, r1h, r1l) {
        const hb = ((value & 0xFF00) >> 8) & 0xFF;
        const lb = (value & 0x00FF) & 0xFF;
        this.register[r1h] = hb;
        this.register[r1l] = lb;
    }
    cycle() {
        const { MAX_FPS, CLOCK_SPEED, MAX_FRAME_CYCLES } = _constants_cpu_constants__WEBPACK_IMPORTED_MODULE_1__["CPUSettings"];
        let frameClock = (this.clock.M / 4) + _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_2__["GPUSettings"].CYCLES_PER_FRAME;
        let cycles = 0;
        let operationCycles = 0;
        let nextIs16bit = false;
        do {
            if (this.IME && this.mmu.IE && this.mmu.IF) {
                if (this.mmu.IE & this.mmu.IF & this.IS_INTERRUPTED) {
                    this.mmu.IF &= 0xFF - this.IS_INTERRUPTED;
                    this.opcodes.RST(this.V_BLANK_INTERRUPT);
                }
            }
            this.register.PC &= MAX_FRAME_CYCLES;
            const pc = this.register.PC;
            let opcode = this.mmu.read(nextIs16bit ? pc + 1 : pc);
            cycles = this.clock.M;
            console.log('----------------BLARGG---------------');
            console.log('Instruction:', opcode.toString(16).toUpperCase(), nextIs16bit ? '16 bit' : '8 bit');
            console.log(`A: ${this.register.A.toString(16).toUpperCase()}, F: ${this.register.F.toString(16).toUpperCase()}, B: ${this.register.B.toString(16).toUpperCase()}, C: ${this.register.C.toString(16).toUpperCase()}, D: ${this.register.D.toString(16).toUpperCase()}, E: ${this.register.E.toString(16).toUpperCase()}, H: ${this.register.H.toString(16).toUpperCase()}, L: ${this.register.L.toString(16).toUpperCase()}, SP: ${this.register.SP.toString(16).toUpperCase()}, PC: ${this.register.PC.toString(16).toUpperCase()}, (${this.mmu.read(this.register.PC).toString(16).toUpperCase()} ${this.mmu.read(this.register.PC + 1).toString(16).toUpperCase()} ${this.mmu.read(this.register.PC + 2).toString(16).toUpperCase()} ${this.mmu.read(this.register.PC + 3).toString(16).toUpperCase()})`);
            console.log('CYCLES:', cycles);
            console.log('PC:', this.register.PC);
            this.executeInstruction(opcode, nextIs16bit ? 16 : 8);
            nextIs16bit = opcode == 0xCB;
            this.debug.readSerialOutput();
            this.gpu.tick();
        } while (this.clock.M / 4 < frameClock);
    }
    executeInstruction(opcode, type) {
        function execute8bit() {
            switch (opcode & 0xFFFF) {
                case opcode & 0xFFFF:
                    switch (opcode & 0xFF) {
                        case 0x00:
                            this.opcodes.NOP();
                            break;
                        case 0x01:
                            this.opcodes.LD_RR_d16('B', 'C');
                            break;
                        case 0x02:
                            this.opcodes.LD_RR_R('B', 'C', 'A');
                            break;
                        case 0x03:
                            this.opcodes.INC_RR('B', 'C');
                            break;
                        case 0x04:
                            this.opcodes.INC_R('B');
                            break;
                        case 0x05:
                            this.opcodes.DEC_R('B');
                            break;
                        case 0x06:
                            this.opcodes.LD_R_d8('B');
                            break;
                        case 0x07:
                            this.opcodes.RLC_R('A', 1, 4);
                            break;
                        case 0x08:
                            this.opcodes.LD_a16_SP();
                            break;
                        case 0x09:
                            this.opcodes.ADD_RR_RR('H', 'L', 'B', 'C');
                            break;
                        case 0x0A:
                            this.opcodes.LD_R_RR('A', 'B', 'C');
                            break;
                        case 0x0B:
                            this.opcodes.DEC_RR('B', 'C');
                            break;
                        case 0x0C:
                            this.opcodes.INC_R('C');
                            break;
                        case 0x0D:
                            this.opcodes.DEC_R('C');
                            break;
                        case 0x0E:
                            this.opcodes.LD_R_d8('C');
                            break;
                        case 0x0F:
                            this.opcodes.RRC_R('A', 1, 4);
                            break;
                        case 0x11:
                            this.opcodes.LD_RR_d16('D', 'E');
                            break;
                        case 0x12:
                            this.opcodes.LD_RR_R('D', 'E', 'A');
                            break;
                        case 0x13:
                            this.opcodes.INC_RR('D', 'E');
                            break;
                        case 0x14:
                            this.opcodes.INC_R('D');
                            break;
                        case 0x15:
                            this.opcodes.DEC_R('D');
                            break;
                        case 0x16:
                            this.opcodes.LD_R_d8('D');
                            break;
                        case 0x17:
                            this.opcodes.RL_R('A', 1, 4);
                            break;
                        case 0x18:
                            this.opcodes.JR();
                            break;
                        case 0x19:
                            this.opcodes.ADD_RR_RR('H', 'L', 'D', 'E');
                            break;
                        case 0x1A:
                            this.opcodes.LD_R_RR('A', 'D', 'E');
                            break;
                        case 0x1B:
                            this.opcodes.DEC_RR('D', 'E');
                            break;
                        case 0x1C:
                            this.opcodes.INC_R('E');
                            break;
                        case 0x1D:
                            this.opcodes.DEC_R('E');
                            break;
                        case 0x1E:
                            this.opcodes.LD_R_d8('E');
                            break;
                        case 0x1F:
                            this.opcodes.RR_R('A', 1, 4);
                            break;
                        case 0x20:
                            this.opcodes.JR_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0x21:
                            this.opcodes.LD_RR_d16('H', 'L');
                            break;
                        case 0x22:
                            this.opcodes.LD_RR_R('H', 'L', 'A', true);
                            break;
                        case 0x23:
                            this.opcodes.INC_RR('H', 'L');
                            break;
                        case 0x24:
                            this.opcodes.INC_R('H');
                            break;
                        case 0x25:
                            this.opcodes.DEC_R('H');
                            break;
                        case 0x26:
                            this.opcodes.LD_R_d8('H');
                            break;
                        case 0x27:
                            this.opcodes.DAA();
                            break;
                        case 0x28:
                            this.opcodes.JR_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0x29:
                            this.opcodes.ADD_RR_RR('H', 'L', 'H', 'L');
                            break;
                        case 0x2A:
                            this.opcodes.LD_R_RR('A', 'H', 'L', true);
                            break;
                        case 0x2B:
                            this.opcodes.DEC_RR('H', 'L');
                            break;
                        case 0x2C:
                            this.opcodes.INC_R('L');
                            break;
                        case 0x2D:
                            this.opcodes.DEC_R('L');
                            break;
                        case 0x2E:
                            this.opcodes.LD_R_d8('L');
                            break;
                        case 0x2F:
                            this.opcodes.CPL();
                            break;
                        case 0x30:
                            this.opcodes.JR_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0x31:
                            this.opcodes.LD_SP_d16();
                            break;
                        case 0x32:
                            this.opcodes.LD_RR_R('H', 'L', 'A', false, true);
                            break;
                        case 0x33:
                            this.opcodes.INC_SP();
                            break;
                        case 0x34:
                            this.opcodes.INC_RR_mem('H', 'L');
                            break;
                        case 0x35:
                            this.opcodes.DEC_RR_mem('H', 'L');
                            break;
                        case 0x36:
                            this.opcodes.LD_RR_nn('H', 'L');
                            break;
                        case 0x37:
                            this.opcodes.SCF();
                            break;
                        case 0x38:
                            this.opcodes.JR_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0x39:
                            this.opcodes.ADD_RR_SP('H', 'L');
                            break;
                        case 0x3A:
                            this.opcodes.LD_R_RR('A', 'H', 'L', false, true);
                            break;
                        case 0x3B:
                            this.opcodes.DEC_SP();
                            break;
                        case 0x3C:
                            this.opcodes.INC_R('A');
                            break;
                        case 0x3D:
                            this.opcodes.DEC_R('A');
                            break;
                        case 0x3E:
                            this.opcodes.LD_R_d8('A');
                            break;
                        case 0x3F:
                            this.opcodes.CCF();
                            break;
                        case 0x40:
                            this.opcodes.LD_R_R('B', 'B');
                            break;
                        case 0x41:
                            this.opcodes.LD_R_R('B', 'C');
                            break;
                        case 0x42:
                            this.opcodes.LD_R_R('B', 'D');
                            break;
                        case 0x43:
                            this.opcodes.LD_R_R('B', 'E');
                            break;
                        case 0x44:
                            this.opcodes.LD_R_R('B', 'H');
                            break;
                        case 0x45:
                            this.opcodes.LD_R_R('B', 'L');
                            break;
                        case 0x46:
                            this.opcodes.LD_R_RR('B', 'H', 'L');
                            break;
                        case 0x47:
                            this.opcodes.LD_R_R('B', 'A');
                            break;
                        case 0x48:
                            this.opcodes.LD_R_R('C', 'B');
                            break;
                        case 0x49:
                            this.opcodes.LD_R_R('C', 'C');
                            break;
                        case 0x4A:
                            this.opcodes.LD_R_R('C', 'D');
                            break;
                        case 0x4B:
                            this.opcodes.LD_R_R('C', 'E');
                            break;
                        case 0x4C:
                            this.opcodes.LD_R_R('C', 'H');
                            break;
                        case 0x4D:
                            this.opcodes.LD_R_R('C', 'L');
                            break;
                        case 0x4E:
                            this.opcodes.LD_RR_R('C', 'H', 'L');
                            break;
                        case 0x4F:
                            this.opcodes.LD_R_R('C', 'A');
                            break;
                        case 0x50:
                            this.opcodes.LD_R_R('D', 'B');
                            break;
                        case 0x51:
                            this.opcodes.LD_R_R('D', 'C');
                            break;
                        case 0x52:
                            this.opcodes.LD_R_R('D', 'D');
                            break;
                        case 0x53:
                            this.opcodes.LD_R_R('D', 'E');
                            break;
                        case 0x54:
                            this.opcodes.LD_R_R('D', 'H');
                            break;
                        case 0x55:
                            this.opcodes.LD_R_R('D', 'L');
                            break;
                        case 0x56:
                            this.opcodes.LD_R_RR('D', 'H', 'L');
                            break;
                        case 0x57:
                            this.opcodes.LD_R_R('D', 'A');
                            break;
                        case 0x58:
                            this.opcodes.LD_R_R('E', 'B');
                            break;
                        case 0x59:
                            this.opcodes.LD_R_R('E', 'C');
                            break;
                        case 0x5A:
                            this.opcodes.LD_R_R('E', 'D');
                            break;
                        case 0x5B:
                            this.opcodes.LD_R_R('E', 'E');
                            break;
                        case 0x5C:
                            this.opcodes.LD_R_R('E', 'H');
                            break;
                        case 0x5D:
                            this.opcodes.LD_R_R('E', 'L');
                            break;
                        case 0x5E:
                            this.opcodes.LD_R_RR('E', 'H', 'L');
                            break;
                        case 0x5F:
                            this.opcodes.LD_R_R('E', 'A');
                            break;
                        case 0x60:
                            this.opcodes.LD_R_R('H', 'B');
                            break;
                        case 0x61:
                            this.opcodes.LD_R_R('H', 'C');
                            break;
                        case 0x62:
                            this.opcodes.LD_R_R('H', 'D');
                            break;
                        case 0x63:
                            this.opcodes.LD_R_R('H', 'E');
                            break;
                        case 0x64:
                            this.opcodes.LD_R_R('H', 'H');
                            break;
                        case 0x65:
                            this.opcodes.LD_R_R('H', 'L');
                            break;
                        case 0x66:
                            this.opcodes.LD_R_RR('H', 'H', 'L');
                            break;
                        case 0x67:
                            this.opcodes.LD_R_R('H', 'A');
                            break;
                        case 0x68:
                            this.opcodes.LD_R_R('L', 'B');
                            break;
                        case 0x69:
                            this.opcodes.LD_R_R('L', 'C');
                            break;
                        case 0x6A:
                            this.opcodes.LD_R_R('L', 'D');
                            break;
                        case 0x6B:
                            this.opcodes.LD_R_R('L', 'E');
                            break;
                        case 0x6C:
                            this.opcodes.LD_R_R('L', 'H');
                            break;
                        case 0x6D:
                            this.opcodes.LD_R_R('L', 'L');
                            break;
                        case 0x6E:
                            this.opcodes.LD_R_RR('L', 'H', 'L');
                            break;
                        case 0x6F:
                            this.opcodes.LD_R_R('L', 'A');
                            break;
                        case 0x70:
                            this.opcodes.LD_RR_R('H', 'L', 'B');
                            break;
                        case 0x71:
                            this.opcodes.LD_RR_R('H', 'L', 'C');
                            break;
                        case 0x72:
                            this.opcodes.LD_RR_R('H', 'L', 'D');
                            break;
                        case 0x73:
                            this.opcodes.LD_RR_R('H', 'L', 'E');
                            break;
                        case 0x74:
                            this.opcodes.LD_RR_R('H', 'L', 'H');
                            break;
                        case 0x75:
                            this.opcodes.LD_RR_R('H', 'L', 'L');
                            break;
                        case 0x76:
                            this.opcodes.HALT();
                            break;
                        case 0x77:
                            this.opcodes.LD_RR_R('H', 'L', 'A');
                            break;
                        case 0x78:
                            this.opcodes.LD_R_R('A', 'B');
                            break;
                        case 0x79:
                            this.opcodes.LD_R_R('A', 'C');
                            break;
                        case 0x7A:
                            this.opcodes.LD_R_R('A', 'D');
                            break;
                        case 0x7B:
                            this.opcodes.LD_R_R('A', 'E');
                            break;
                        case 0x7C:
                            this.opcodes.LD_R_R('A', 'H');
                            break;
                        case 0x7D:
                            this.opcodes.LD_R_R('A', 'L');
                            break;
                        case 0x7E:
                            this.opcodes.LD_R_RR('A', 'H', 'L');
                            break;
                        case 0x7F:
                            this.opcodes.LD_R_R('A', 'A');
                            break;
                        case 0x80:
                            this.opcodes.ADD_R_R('A', 'B');
                            break;
                        case 0x81:
                            this.opcodes.ADD_R_R('A', 'C');
                            break;
                        case 0x82:
                            this.opcodes.ADD_R_R('A', 'D');
                            break;
                        case 0x83:
                            this.opcodes.ADD_R_R('A', 'E');
                            break;
                        case 0x84:
                            this.opcodes.ADD_R_R('A', 'H');
                            break;
                        case 0x85:
                            this.opcodes.ADD_R_R('A', 'L');
                            break;
                        case 0x86:
                            this.opcodes.ADD_R_RR('A', 'H', 'L');
                            break;
                        case 0x87:
                            this.opcodes.ADD_R_R('A', 'A');
                            break;
                        case 0x88:
                            this.opcodes.ADC_R_R('A', 'B');
                            break;
                        case 0x89:
                            this.opcodes.ADC_R_R('A', 'C');
                            break;
                        case 0x8A:
                            this.opcodes.ADC_R_R('A', 'D');
                            break;
                        case 0x8B:
                            this.opcodes.ADC_R_R('A', 'E');
                            break;
                        case 0x8C:
                            this.opcodes.ADC_R_R('A', 'H');
                            break;
                        case 0x8D:
                            this.opcodes.ADC_R_R('A', 'L');
                            break;
                        case 0x8E:
                            this.opcodes.ADC_R_RR('A', 'H', 'L');
                            break;
                        case 0x8F:
                            this.opcodes.ADC_R_R('A', 'A');
                            break;
                        case 0x90:
                            this.opcodes.SUB_R('B');
                            break;
                        case 0x91:
                            this.opcodes.SUB_R('C');
                            break;
                        case 0x92:
                            this.opcodes.SUB_R('D');
                            break;
                        case 0x93:
                            this.opcodes.SUB_R('E');
                            break;
                        case 0x94:
                            this.opcodes.SUB_R('H');
                            break;
                        case 0x95:
                            this.opcodes.SUB_R('L');
                            break;
                        case 0x96:
                            this.opcodes.SUB_RR('H', 'L');
                            break;
                        case 0x97:
                            this.opcodes.SUB_R('A');
                            break;
                        case 0x98:
                            this.opcodes.SBC_R_R('A', 'B');
                            break;
                        case 0x99:
                            this.opcodes.SBC_R_R('A', 'C');
                            break;
                        case 0x9A:
                            this.opcodes.SBC_R_R('A', 'D');
                            break;
                        case 0x9B:
                            this.opcodes.SBC_R_R('A', 'E');
                            break;
                        case 0x9C:
                            this.opcodes.SBC_R_R('A', 'H');
                            break;
                        case 0x9D:
                            this.opcodes.SBC_R_R('A', 'L');
                            break;
                        case 0x9E:
                            this.opcodes.SBC_R_RR('A', 'H', 'L');
                            break;
                        case 0x9F:
                            this.opcodes.SBC_R_R('A', 'A');
                            break;
                        case 0xA0:
                            this.opcodes.AND_R('B');
                            break;
                        case 0xA1:
                            this.opcodes.AND_R('C');
                            break;
                        case 0xA2:
                            this.opcodes.AND_R('D');
                            break;
                        case 0xA3:
                            this.opcodes.AND_R('E');
                            break;
                        case 0xA4:
                            this.opcodes.AND_R('H');
                            break;
                        case 0xA5:
                            this.opcodes.AND_R('L');
                            break;
                        case 0xA6:
                            this.opcodes.AND_RR('H', 'L');
                            break;
                        case 0xA7:
                            this.opcodes.AND_R('A');
                            break;
                        case 0xA8:
                            this.opcodes.XOR_R('B');
                            break;
                        case 0xA9:
                            this.opcodes.XOR_R('C');
                            break;
                        case 0xAA:
                            this.opcodes.XOR_R('D');
                            break;
                        case 0xAB:
                            this.opcodes.XOR_R('E');
                            break;
                        case 0xAC:
                            this.opcodes.XOR_R('H');
                            break;
                        case 0xAD:
                            this.opcodes.XOR_R('L');
                            break;
                        case 0xAE:
                            this.opcodes.XOR_RR('H', 'L');
                            break;
                        case 0xAF:
                            this.opcodes.XOR_R('A');
                            break;
                        case 0xB0:
                            this.opcodes.OR_R('B');
                            break;
                        case 0xB1:
                            this.opcodes.OR_R('C');
                            break;
                        case 0xB2:
                            this.opcodes.OR_R('D');
                            break;
                        case 0xB3:
                            this.opcodes.OR_R('E');
                            break;
                        case 0xB4:
                            this.opcodes.OR_R('H');
                            break;
                        case 0xB5:
                            this.opcodes.OR_R('L');
                            break;
                        case 0xB6:
                            this.opcodes.OR_RR('H', 'L');
                            break;
                        case 0xB7:
                            this.opcodes.OR_R('A');
                            break;
                        case 0xB8:
                            this.opcodes.CP_R('B');
                            break;
                        case 0xB9:
                            this.opcodes.CP_R('C');
                            break;
                        case 0xBA:
                            this.opcodes.CP_R('D');
                            break;
                        case 0xBB:
                            this.opcodes.CP_R('E');
                            break;
                        case 0xBC:
                            this.opcodes.CP_R('H');
                            break;
                        case 0xBD:
                            this.opcodes.CP_R('L');
                            break;
                        case 0xBE:
                            this.opcodes.CP_RR('H', 'L');
                            break;
                        case 0xBF:
                            this.opcodes.CP_R('A');
                            break;
                        case 0xC0:
                            this.opcodes.RET_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0xC1:
                            this.opcodes.POP_RR('B', 'C');
                            break;
                        case 0xC2:
                            this.opcodes.JP_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0xC3:
                            this.opcodes.JP();
                            break;
                        case 0xC4:
                            this.opcodes.CALL_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0xC5:
                            this.opcodes.PUSH_RR('B', 'C');
                            break;
                        case 0xC6:
                            this.opcodes.ADD_R_d8('A');
                            break;
                        case 0xC7:
                            this.opcodes.RST(0x00);
                            break;
                        case 0xC8:
                            this.opcodes.RET_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0xC9:
                            this.opcodes.RET();
                            break;
                        case 0xCA:
                            this.opcodes.JP_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0xCB:
                            break;
                        case 0xCC:
                            this.opcodes.CALL_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].Z);
                            break;
                        case 0xCD:
                            this.opcodes.CALL();
                            break;
                        case 0xCE:
                            this.opcodes.ADC_R_d8('A');
                            break;
                        case 0xCF:
                            this.opcodes.RST(0x08);
                            break;
                        case 0xD0:
                            this.opcodes.RET_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0xD1:
                            this.opcodes.POP_RR('D', 'E');
                            break;
                        case 0xD2:
                            this.opcodes.JP_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0xD3:
                            break;
                        case 0xD4:
                            this.opcodes.CALL_NF(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0xD5:
                            this.opcodes.PUSH_RR('D', 'E');
                            break;
                        case 0xD6:
                            this.opcodes.SUB();
                            break;
                        case 0xD7:
                            this.opcodes.RST(0x10);
                            break;
                        case 0xD8:
                            this.opcodes.RET_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0xD9:
                            this.opcodes.RETI();
                            break;
                        case 0xDA:
                            this.opcodes.JP_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0xDB:
                            break;
                        case 0xDC:
                            this.opcodes.CALL_F(_models__WEBPACK_IMPORTED_MODULE_0__["CPUFlagType"].C);
                            break;
                        case 0xDD:
                            break;
                        case 0xDE:
                            this.opcodes.SBC_R_d8('A');
                            break;
                        case 0xDF:
                            this.opcodes.RST(0x18);
                            break;
                        case 0xE0:
                            this.opcodes.LD_a8_R('A');
                            break;
                        case 0xE1:
                            this.opcodes.POP_RR('H', 'L');
                            break;
                        case 0xE2:
                            this.opcodes.LD_C_R('A');
                            break;
                        case 0xE3:
                        case 0xE4:
                            break;
                        case 0xE5:
                            this.opcodes.PUSH_RR('H', 'L');
                            break;
                        case 0xE6:
                            this.opcodes.AND();
                            break;
                        case 0xE7:
                            this.opcodes.RST(0x20);
                            break;
                        case 0xE8:
                            this.opcodes.ADD_SP_d8();
                            break;
                        case 0xE9:
                            this.opcodes.JP_RR('H', 'L');
                            break;
                        case 0xEA:
                            this.opcodes.LD_a16_R('A');
                            break;
                        case 0xEB:
                        case 0xEC:
                        case 0xED:
                            break;
                        case 0xEE:
                            this.opcodes.XOR();
                            break;
                        case 0xEF:
                            this.opcodes.RST(0x28);
                            break;
                        case 0xF0:
                            this.opcodes.LD_R_a8('A');
                            break;
                        case 0xF1:
                            this.opcodes.POP_RR('A', 'F');
                            break;
                        case 0xF2:
                            this.opcodes.LD_R_C('A');
                            break;
                        case 0xF3:
                            this.opcodes.DI();
                            break;
                        case 0xF4:
                            break;
                        case 0xF5:
                            this.opcodes.PUSH_RR('A', 'F');
                            break;
                        case 0xF6:
                            this.opcodes.OR();
                            break;
                        case 0xF7:
                            this.opcodes.RST(0x30);
                            break;
                        case 0xF8:
                            this.opcodes.LD_RR_SPd8('H', 'L');
                            break;
                        case 0xF9:
                            this.opcodes.LD_SP_RR('H', 'L');
                            break;
                        case 0xFA:
                            this.opcodes.LD_R_a16('A');
                            break;
                        case 0xFB:
                            this.opcodes.EI();
                            break;
                        case 0xFC:
                        case 0xFD:
                            break;
                        case 0xFE:
                            this.opcodes.CP();
                            break;
                        case 0xFF:
                            this.opcodes.RST(0x38);
                            break;
                    }
                    break;
                case 0x1000:
                    this.opcodes.STOP();
                    break;
                default:
                    console.log('Unimplemented opcode (8-bit):', opcode);
            }
        }
        function execute16bit() {
            switch (opcode & 0xCBFF) {
                case opcode & 0xCBFF:
                    switch (opcode & 0xFF) {
                        case 0x00:
                            this.opcodes.RLC_R('B', 2, 8);
                            break;
                        case 0x01:
                            this.opcodes.RLC_R('C', 2, 8);
                            break;
                        case 0x02:
                            this.opcodes.RLC_R('D', 2, 8);
                            break;
                        case 0x03:
                            this.opcodes.RLC_R('E', 2, 8);
                            break;
                        case 0x04:
                            this.opcodes.RLC_R('H', 2, 8);
                            break;
                        case 0x05:
                            this.opcodes.RLC_R('L', 2, 8);
                            break;
                        case 0x06:
                            this.opcodes.RLC_RR('H', 'L');
                            break;
                        case 0x07:
                            this.opcodes.RLC_R('A', 2, 8);
                            break;
                        case 0x08:
                            this.opcodes.RRC_R('B', 2, 8);
                            break;
                        case 0x09:
                            this.opcodes.RRC_R('C', 2, 8);
                            break;
                        case 0x0A:
                            this.opcodes.RRC_R('D', 2, 8);
                            break;
                        case 0x0B:
                            this.opcodes.RRC_R('E', 2, 8);
                            break;
                        case 0x0C:
                            this.opcodes.RRC_R('H', 2, 8);
                            break;
                        case 0x0D:
                            this.opcodes.RRC_R('L', 2, 8);
                            break;
                        case 0x0E:
                            this.opcodes.RRC_RR('H', 'L');
                            break;
                        case 0x0F:
                            this.opcodes.RRC_R('A', 2, 8);
                            break;
                        case 0x10:
                            this.opcodes.RL_R('B', 2, 8);
                            break;
                        case 0x11:
                            this.opcodes.RL_R('C', 2, 8);
                            break;
                        case 0x12:
                            this.opcodes.RL_R('D', 2, 8);
                            break;
                        case 0x13:
                            this.opcodes.RL_R('E', 2, 8);
                            break;
                        case 0x14:
                            this.opcodes.RL_R('H', 2, 8);
                            break;
                        case 0x15:
                            this.opcodes.RL_R('L', 2, 8);
                            break;
                        case 0x16:
                            this.opcodes.RL_RR('H', 'L');
                            break;
                        case 0x18:
                            this.opcodes.RL_R('A', 2, 8);
                            break;
                        case 0x19:
                            this.opcodes.RR_R('B', 2, 8);
                            break;
                        case 0x1A:
                            this.opcodes.RR_R('D', 2, 8);
                            break;
                        case 0x1B:
                            this.opcodes.RR_R('E', 2, 8);
                            break;
                        case 0x1C:
                            this.opcodes.RR_R('H', 2, 8);
                            break;
                        case 0x1D:
                            this.opcodes.RR_R('L', 2, 8);
                            break;
                        case 0x1E:
                            this.opcodes.RR_RR('H', 'L');
                            break;
                        case 0x1F:
                            this.opcodes.RR_R('A', 2, 8);
                            break;
                        case 0x20:
                            this.opcodes.SLA_R('B');
                            break;
                        case 0x21:
                            this.opcodes.SLA_R('C');
                            break;
                        case 0x22:
                            this.opcodes.SLA_R('D');
                            break;
                        case 0x23:
                            this.opcodes.SLA_R('E');
                            break;
                        case 0x24:
                            this.opcodes.SLA_R('H');
                            break;
                        case 0x25:
                            this.opcodes.SLA_R('L');
                            break;
                        case 0x26:
                            this.opcodes.SLA_RR('H', 'L');
                            break;
                        case 0x27:
                            this.opcodes.SLA_R('A');
                            break;
                        case 0x28:
                            this.opcodes.SRA_R('B');
                            break;
                        case 0x29:
                            this.opcodes.SRA_R('C');
                            break;
                        case 0x2A:
                            this.opcodes.SRA_R('D');
                            break;
                        case 0x2B:
                            this.opcodes.SRA_R('E');
                            break;
                        case 0x2C:
                            this.opcodes.SRA_R('H');
                            break;
                        case 0x2D:
                            this.opcodes.SRA_R('L');
                            break;
                        case 0x2E:
                            this.opcodes.SRA_RR('H', 'L');
                            break;
                        case 0x2F:
                            this.opcodes.SRA_R('A');
                            break;
                        case 0x30:
                            this.opcodes.SWAP_R('B');
                            break;
                        case 0x31:
                            this.opcodes.SWAP_R('C');
                            break;
                        case 0x32:
                            this.opcodes.SWAP_R('D');
                            break;
                        case 0x33:
                            this.opcodes.SWAP_R('E');
                            break;
                        case 0x34:
                            this.opcodes.SWAP_R('H');
                            break;
                        case 0x35:
                            this.opcodes.SWAP_R('L');
                            break;
                        case 0x36:
                            this.opcodes.SWAP_RR('H', 'L');
                            break;
                        case 0x37:
                            this.opcodes.SWAP_R('A');
                            break;
                        case 0x38:
                            this.opcodes.SRL_R('B');
                            break;
                        case 0x39:
                            this.opcodes.SRL_R('C');
                            break;
                        case 0x3A:
                            this.opcodes.SRL_R('D');
                            break;
                        case 0x3B:
                            this.opcodes.SRL_R('E');
                            break;
                        case 0x3C:
                            this.opcodes.SRL_R('H');
                            break;
                        case 0x3D:
                            this.opcodes.SRL_R('L');
                            break;
                        case 0x3E:
                            this.opcodes.SRL_RR('H', 'L');
                            break;
                        case 0x3F:
                            this.opcodes.SRL_R('A');
                            break;
                        case 0x40:
                            this.opcodes.BIT_b_R(0x01, 'B');
                            break;
                        case 0x41:
                            this.opcodes.BIT_b_R(0x01, 'C');
                            break;
                        case 0x42:
                            this.opcodes.BIT_b_R(0x01, 'D');
                            break;
                        case 0x43:
                            this.opcodes.BIT_b_R(0x01, 'E');
                            break;
                        case 0x44:
                            this.opcodes.BIT_b_R(0x01, 'H');
                            break;
                        case 0x45:
                            this.opcodes.BIT_b_R(0x01, 'L');
                            break;
                        case 0x46:
                            this.opcodes.BIT_b_RR(0x01, 'H', 'L');
                            break;
                        case 0x47:
                            this.opcodes.BIT_b_R(0x01, 'A');
                            break;
                        case 0x48:
                            this.opcodes.BIT_b_R(0x02, 'B');
                            break;
                        case 0x49:
                            this.opcodes.BIT_b_R(0x02, 'C');
                            break;
                        case 0x4A:
                            this.opcodes.BIT_b_R(0x02, 'D');
                            break;
                        case 0x4B:
                            this.opcodes.BIT_b_R(0x02, 'E');
                            break;
                        case 0x4C:
                            this.opcodes.BIT_b_R(0x02, 'H');
                            break;
                        case 0x4D:
                            this.opcodes.BIT_b_R(0x02, 'L');
                            break;
                        case 0x4E:
                            this.opcodes.BIT_b_RR(0x02, 'H', 'L');
                            break;
                        case 0x4F:
                            this.opcodes.BIT_b_R(0x02, 'A');
                            break;
                        case 0x50:
                            this.opcodes.BIT_b_R(0x04, 'B');
                            break;
                        case 0x51:
                            this.opcodes.BIT_b_R(0x04, 'C');
                            break;
                        case 0x52:
                            this.opcodes.BIT_b_R(0x04, 'D');
                            break;
                        case 0x53:
                            this.opcodes.BIT_b_R(0x04, 'E');
                            break;
                        case 0x54:
                            this.opcodes.BIT_b_R(0x04, 'H');
                            break;
                        case 0x55:
                            this.opcodes.BIT_b_R(0x04, 'L');
                            break;
                        case 0x56:
                            this.opcodes.BIT_b_RR(0x04, 'H', 'L');
                            break;
                        case 0x57:
                            this.opcodes.BIT_b_R(0x04, 'A');
                            break;
                        case 0x58:
                            this.opcodes.BIT_b_R(0x08, 'B');
                            break;
                        case 0x59:
                            this.opcodes.BIT_b_R(0x08, 'C');
                            break;
                        case 0x5A:
                            this.opcodes.BIT_b_R(0x08, 'D');
                            break;
                        case 0x5B:
                            this.opcodes.BIT_b_R(0x08, 'E');
                            break;
                        case 0x5C:
                            this.opcodes.BIT_b_R(0x08, 'H');
                            break;
                        case 0x5D:
                            this.opcodes.BIT_b_R(0x08, 'L');
                            break;
                        case 0x5E:
                            this.opcodes.BIT_b_RR(0x08, 'H', 'L');
                            break;
                        case 0x5F:
                            this.opcodes.BIT_b_R(0x08, 'A');
                            break;
                        case 0x60:
                            this.opcodes.BIT_b_R(0x10, 'B');
                            break;
                        case 0x61:
                            this.opcodes.BIT_b_R(0x10, 'C');
                            break;
                        case 0x62:
                            this.opcodes.BIT_b_R(0x10, 'D');
                            break;
                        case 0x63:
                            this.opcodes.BIT_b_R(0x10, 'E');
                            break;
                        case 0x64:
                            this.opcodes.BIT_b_R(0x10, 'H');
                            break;
                        case 0x65:
                            this.opcodes.BIT_b_R(0x10, 'L');
                            break;
                        case 0x66:
                            this.opcodes.BIT_b_RR(0x10, 'H', 'L');
                            break;
                        case 0x67:
                            this.opcodes.BIT_b_R(0x10, 'A');
                            break;
                        case 0x68:
                            this.opcodes.BIT_b_R(0x20, 'B');
                            break;
                        case 0x69:
                            this.opcodes.BIT_b_R(0x20, 'C');
                            break;
                        case 0x6A:
                            this.opcodes.BIT_b_R(0x20, 'D');
                            break;
                        case 0x6B:
                            this.opcodes.BIT_b_R(0x20, 'E');
                            break;
                        case 0x6C:
                            this.opcodes.BIT_b_R(0x20, 'H');
                            break;
                        case 0x6D:
                            this.opcodes.BIT_b_R(0x20, 'L');
                            break;
                        case 0x6E:
                            this.opcodes.BIT_b_RR(0x20, 'H', 'L');
                            break;
                        case 0x6F:
                            this.opcodes.BIT_b_R(0x20, 'A');
                            break;
                        case 0x70:
                            this.opcodes.BIT_b_R(0x40, 'B');
                            break;
                        case 0x71:
                            this.opcodes.BIT_b_R(0x40, 'C');
                            break;
                        case 0x72:
                            this.opcodes.BIT_b_R(0x40, 'D');
                            break;
                        case 0x73:
                            this.opcodes.BIT_b_R(0x40, 'E');
                            break;
                        case 0x74:
                            this.opcodes.BIT_b_R(0x40, 'H');
                            break;
                        case 0x75:
                            this.opcodes.BIT_b_R(0x40, 'L');
                            break;
                        case 0x76:
                            this.opcodes.BIT_b_RR(0x40, 'H', 'L');
                            break;
                        case 0x77:
                            this.opcodes.BIT_b_R(0x40, 'A');
                            break;
                        case 0x78:
                            this.opcodes.BIT_b_R(0x80, 'B');
                            break;
                        case 0x79:
                            this.opcodes.BIT_b_R(0x80, 'C');
                            break;
                        case 0x7A:
                            this.opcodes.BIT_b_R(0x80, 'D');
                            break;
                        case 0x7B:
                            this.opcodes.BIT_b_R(0x80, 'E');
                            break;
                        case 0x7C:
                            this.opcodes.BIT_b_R(0x80, 'H');
                            break;
                        case 0x7D:
                            this.opcodes.BIT_b_R(0x80, 'L');
                            break;
                        case 0x7E:
                            this.opcodes.BIT_b_RR(0x80, 'H', 'L');
                            break;
                        case 0x7F:
                            this.opcodes.BIT_b_R(0x80, 'A');
                            break;
                        case 0x80:
                            this.opcodes.RES_b_R(0x01, 'B');
                            break;
                        case 0x81:
                            this.opcodes.RES_b_R(0x01, 'C');
                            break;
                        case 0x82:
                            this.opcodes.RES_b_R(0x01, 'D');
                            break;
                        case 0x83:
                            this.opcodes.RES_b_R(0x01, 'E');
                            break;
                        case 0x84:
                            this.opcodes.RES_b_R(0x01, 'H');
                            break;
                        case 0x85:
                            this.opcodes.RES_b_R(0x01, 'L');
                            break;
                        case 0x86:
                            this.opcodes.RES_b_RR(0x01, 'H', 'L');
                            break;
                        case 0x87:
                            this.opcodes.RES_b_R(0x01, 'A');
                            break;
                        case 0x88:
                            this.opcodes.RES_b_R(0x02, 'B');
                            break;
                        case 0x89:
                            this.opcodes.RES_b_R(0x02, 'C');
                            break;
                        case 0x8A:
                            this.opcodes.RES_b_R(0x02, 'D');
                            break;
                        case 0x8B:
                            this.opcodes.RES_b_R(0x02, 'E');
                            break;
                        case 0x8C:
                            this.opcodes.RES_b_R(0x02, 'H');
                            break;
                        case 0x8D:
                            this.opcodes.RES_b_R(0x02, 'L');
                            break;
                        case 0x8E:
                            this.opcodes.RES_b_RR(0x02, 'H', 'L');
                            break;
                        case 0x8F:
                            this.opcodes.RES_b_R(0x02, 'A');
                            break;
                        case 0x90:
                            this.opcodes.RES_b_R(0x04, 'B');
                            break;
                        case 0x91:
                            this.opcodes.RES_b_R(0x04, 'C');
                            break;
                        case 0x92:
                            this.opcodes.RES_b_R(0x04, 'D');
                            break;
                        case 0x93:
                            this.opcodes.RES_b_R(0x04, 'E');
                            break;
                        case 0x94:
                            this.opcodes.RES_b_R(0x04, 'H');
                            break;
                        case 0x95:
                            this.opcodes.RES_b_R(0x04, 'L');
                            break;
                        case 0x96:
                            this.opcodes.RES_b_RR(0x04, 'H', 'L');
                            break;
                        case 0x97:
                            this.opcodes.RES_b_R(0x04, 'A');
                            break;
                        case 0x98:
                            this.opcodes.RES_b_R(0x08, 'B');
                            break;
                        case 0x99:
                            this.opcodes.RES_b_R(0x08, 'C');
                            break;
                        case 0x9A:
                            this.opcodes.RES_b_R(0x08, 'D');
                            break;
                        case 0x9B:
                            this.opcodes.RES_b_R(0x08, 'E');
                            break;
                        case 0x9C:
                            this.opcodes.RES_b_R(0x08, 'H');
                            break;
                        case 0x9D:
                            this.opcodes.RES_b_R(0x08, 'L');
                            break;
                        case 0x9E:
                            this.opcodes.RES_b_RR(0x08, 'H', 'L');
                            break;
                        case 0x9F:
                            this.opcodes.RES_b_R(0x08, 'A');
                            break;
                        case 0xA0:
                            this.opcodes.RES_b_R(0x10, 'B');
                            break;
                        case 0xA1:
                            this.opcodes.RES_b_R(0x10, 'C');
                            break;
                        case 0xA2:
                            this.opcodes.RES_b_R(0x10, 'D');
                            break;
                        case 0xA3:
                            this.opcodes.RES_b_R(0x10, 'E');
                            break;
                        case 0xA4:
                            this.opcodes.RES_b_R(0x10, 'H');
                            break;
                        case 0xA5:
                            this.opcodes.RES_b_R(0x10, 'L');
                            break;
                        case 0xA6:
                            this.opcodes.RES_b_RR(0x10, 'H', 'L');
                            break;
                        case 0xA7:
                            this.opcodes.RES_b_R(0x10, 'A');
                            break;
                        case 0xA8:
                            this.opcodes.RES_b_R(0x20, 'B');
                            break;
                        case 0xA9:
                            this.opcodes.RES_b_R(0x20, 'C');
                            break;
                        case 0xAA:
                            this.opcodes.RES_b_R(0x20, 'D');
                            break;
                        case 0xAB:
                            this.opcodes.RES_b_R(0x20, 'E');
                            break;
                        case 0xAC:
                            this.opcodes.RES_b_R(0x20, 'H');
                            break;
                        case 0xAD:
                            this.opcodes.RES_b_R(0x20, 'L');
                            break;
                        case 0xAE:
                            this.opcodes.RES_b_RR(0x20, 'H', 'L');
                            break;
                        case 0xAF:
                            this.opcodes.RES_b_R(0x20, 'A');
                            break;
                        case 0xB0:
                            this.opcodes.RES_b_R(0x40, 'B');
                            break;
                        case 0xB1:
                            this.opcodes.RES_b_R(0x40, 'C');
                            break;
                        case 0xB2:
                            this.opcodes.RES_b_R(0x40, 'D');
                            break;
                        case 0xB3:
                            this.opcodes.RES_b_R(0x40, 'E');
                            break;
                        case 0xB4:
                            this.opcodes.RES_b_R(0x40, 'H');
                            break;
                        case 0xB5:
                            this.opcodes.RES_b_R(0x40, 'L');
                            break;
                        case 0xB6:
                            this.opcodes.RES_b_RR(0x40, 'H', 'L');
                            break;
                        case 0xB7:
                            this.opcodes.RES_b_R(0x40, 'A');
                            break;
                        case 0xB8:
                            this.opcodes.RES_b_R(0x80, 'B');
                            break;
                        case 0xB9:
                            this.opcodes.RES_b_R(0x80, 'C');
                            break;
                        case 0xBA:
                            this.opcodes.RES_b_R(0x80, 'D');
                            break;
                        case 0xBB:
                            this.opcodes.RES_b_R(0x80, 'E');
                            break;
                        case 0xBC:
                            this.opcodes.RES_b_R(0x80, 'H');
                            break;
                        case 0xBD:
                            this.opcodes.RES_b_R(0x80, 'L');
                            break;
                        case 0xBE:
                            this.opcodes.RES_b_RR(0x80, 'H', 'L');
                            break;
                        case 0xBF:
                            this.opcodes.RES_b_R(0x80, 'A');
                            break;
                        case 0xC0:
                            this.opcodes.SET_b_R(0x01, 'B');
                            break;
                        case 0xC1:
                            this.opcodes.SET_b_R(0x01, 'C');
                            break;
                        case 0xC2:
                            this.opcodes.SET_b_R(0x01, 'D');
                            break;
                        case 0xC3:
                            this.opcodes.SET_b_R(0x01, 'E');
                            break;
                        case 0xC4:
                            this.opcodes.SET_b_R(0x01, 'H');
                            break;
                        case 0xC5:
                            this.opcodes.SET_b_R(0x01, 'L');
                            break;
                        case 0xC6:
                            this.opcodes.SET_b_RR(0x01, 'H', 'L');
                            break;
                        case 0xC7:
                            this.opcodes.SET_b_R(0x01, 'A');
                            break;
                        case 0xC8:
                            this.opcodes.SET_b_R(0x02, 'B');
                            break;
                        case 0xC9:
                            this.opcodes.SET_b_R(0x02, 'C');
                            break;
                        case 0xCA:
                            this.opcodes.SET_b_R(0x02, 'D');
                            break;
                        case 0xCB:
                            this.opcodes.SET_b_R(0x02, 'E');
                            break;
                        case 0xCC:
                            this.opcodes.SET_b_R(0x02, 'H');
                            break;
                        case 0xCD:
                            this.opcodes.SET_b_R(0x02, 'L');
                            break;
                        case 0xCE:
                            this.opcodes.SET_b_RR(0x02, 'H', 'L');
                            break;
                        case 0xCF:
                            this.opcodes.SET_b_R(0x02, 'A');
                            break;
                        case 0xD0:
                            this.opcodes.SET_b_R(0x04, 'B');
                            break;
                        case 0xD1:
                            this.opcodes.SET_b_R(0x04, 'C');
                            break;
                        case 0xD2:
                            this.opcodes.SET_b_R(0x04, 'D');
                            break;
                        case 0xD3:
                            this.opcodes.SET_b_R(0x04, 'E');
                            break;
                        case 0xD4:
                            this.opcodes.SET_b_R(0x04, 'H');
                            break;
                        case 0xD5:
                            this.opcodes.SET_b_R(0x04, 'L');
                            break;
                        case 0xD6:
                            this.opcodes.SET_b_RR(0x04, 'H', 'L');
                            break;
                        case 0xD7:
                            this.opcodes.SET_b_R(0x04, 'A');
                            break;
                        case 0xD8:
                            this.opcodes.SET_b_R(0x08, 'B');
                            break;
                        case 0xD9:
                            this.opcodes.SET_b_R(0x08, 'C');
                            break;
                        case 0xDA:
                            this.opcodes.SET_b_R(0x08, 'D');
                            break;
                        case 0xDB:
                            this.opcodes.SET_b_R(0x08, 'E');
                            break;
                        case 0xDC:
                            this.opcodes.SET_b_R(0x08, 'H');
                            break;
                        case 0xDD:
                            this.opcodes.SET_b_R(0x08, 'L');
                            break;
                        case 0xDE:
                            this.opcodes.SET_b_RR(0x08, 'H', 'L');
                            break;
                        case 0xDF:
                            this.opcodes.SET_b_R(0x08, 'A');
                            break;
                        case 0xE0:
                            this.opcodes.SET_b_R(0x10, 'B');
                            break;
                        case 0xE1:
                            this.opcodes.SET_b_R(0x10, 'C');
                            break;
                        case 0xE2:
                            this.opcodes.SET_b_R(0x10, 'D');
                            break;
                        case 0xE3:
                            this.opcodes.SET_b_R(0x10, 'E');
                            break;
                        case 0xE4:
                            this.opcodes.SET_b_R(0x10, 'H');
                            break;
                        case 0xE5:
                            this.opcodes.SET_b_R(0x10, 'L');
                            break;
                        case 0xE6:
                            this.opcodes.SET_b_RR(0x10, 'H', 'L');
                            break;
                        case 0xE7:
                            this.opcodes.SET_b_R(0x10, 'A');
                            break;
                        case 0xE8:
                            this.opcodes.SET_b_R(0x20, 'B');
                            break;
                        case 0xE9:
                            this.opcodes.SET_b_R(0x20, 'C');
                            break;
                        case 0xEA:
                            this.opcodes.SET_b_R(0x20, 'D');
                            break;
                        case 0xEB:
                            this.opcodes.SET_b_R(0x20, 'E');
                            break;
                        case 0xEC:
                            this.opcodes.SET_b_R(0x20, 'H');
                            break;
                        case 0xED:
                            this.opcodes.SET_b_R(0x20, 'L');
                            break;
                        case 0xEE:
                            this.opcodes.SET_b_RR(0x20, 'H', 'L');
                            break;
                        case 0xEF:
                            this.opcodes.SET_b_R(0x20, 'A');
                            break;
                        case 0xF0:
                            this.opcodes.SET_b_R(0x40, 'B');
                            break;
                        case 0xF1:
                            this.opcodes.SET_b_R(0x40, 'C');
                            break;
                        case 0xF2:
                            this.opcodes.SET_b_R(0x40, 'D');
                            break;
                        case 0xF3:
                            this.opcodes.SET_b_R(0x40, 'E');
                            break;
                        case 0xF4:
                            this.opcodes.SET_b_R(0x40, 'H');
                            break;
                        case 0xF5:
                            this.opcodes.SET_b_R(0x40, 'L');
                            break;
                        case 0xF6:
                            this.opcodes.SET_b_RR(0x40, 'H', 'L');
                            break;
                        case 0xF7:
                            this.opcodes.SET_b_R(0x40, 'A');
                            break;
                        case 0xF8:
                            this.opcodes.SET_b_R(0x80, 'B');
                            break;
                        case 0xF9:
                            this.opcodes.SET_b_R(0x80, 'C');
                            break;
                        case 0xFA:
                            this.opcodes.SET_b_R(0x80, 'D');
                            break;
                        case 0xFB:
                            this.opcodes.SET_b_R(0x80, 'E');
                            break;
                        case 0xFC:
                            this.opcodes.SET_b_R(0x80, 'H');
                            break;
                        case 0xFD:
                            this.opcodes.SET_b_R(0x80, 'L');
                            break;
                        case 0xFE:
                            this.opcodes.SET_b_RR(0x80, 'H', 'L');
                            break;
                        case 0xFF:
                            this.opcodes.SET_b_R(0x80, 'A');
                            break;
                    }
                default:
                    console.log('Unimplemented opcode (16-bit):', opcode);
            }
        }
        if (type === 8) {
            execute8bit.bind(this)();
        }
        else {
            execute16bit.bind(this)();
        }
    }
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clock_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _clock_model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_clock_model__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _clock_model__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _clock_model__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _register_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _register_model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_register_model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _register_model__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _register_model__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _flag_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CPUFlag", function() { return _flag_model__WEBPACK_IMPORTED_MODULE_2__["CPUFlag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CPUFlagType", function() { return _flag_model__WEBPACK_IMPORTED_MODULE_2__["CPUFlagType"]; });






/***/ }),
/* 3 */
/***/ (function(module, exports) {



/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPUFlag", function() { return CPUFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPUFlagType", function() { return CPUFlagType; });
var CPUFlag;
(function (CPUFlag) {
    CPUFlag[CPUFlag["Z"] = 128] = "Z";
    CPUFlag[CPUFlag["N"] = 64] = "N";
    CPUFlag[CPUFlag["H"] = 32] = "H";
    CPUFlag[CPUFlag["C"] = 16] = "C";
})(CPUFlag || (CPUFlag = {}));
var CPUFlagType;
(function (CPUFlagType) {
    CPUFlagType["Z"] = "Z";
    CPUFlagType["N"] = "N";
    CPUFlagType["H"] = "H";
    CPUFlagType["C"] = "C";
})(CPUFlagType || (CPUFlagType = {}));



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPUSettings", function() { return CPUSettings; });
const CPUSettings = {
    CLOCK_SPEED: 4194304,
    MAX_FPS: 60,
    MAX_FRAME_CYCLES: 65535
};



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GPUSettings", function() { return GPUSettings; });
const GPUSettings = {
    WIDTH: 160,
    HEIGHT: 144,
    SCALE: 1,
    BACKGROUND_COLOR: '#000000',
    CYCLES_PER_FRAME: 70224
};



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Opcodes", function() { return Opcodes; });
/* harmony import */ var _mmu_mmu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);



class Opcodes {
    constructor(cpu) {
        const { register, clock } = cpu;
        this.mmu = _mmu_mmu__WEBPACK_IMPORTED_MODULE_0__["MMU"].shared;
        this.cpu = cpu;
        this.r = register;
        this.c = clock;
    }
    $incPC(nr = 1) {
        this.cpu.register.PC += nr;
    }
    $incClock(nr = 4) {
        this.cpu.clock.M += nr;
    }
    $getF(flag) {
        return !!(this.r.F & _models__WEBPACK_IMPORTED_MODULE_1__["CPUFlag"][flag]);
    }
    $setF(flag, v) {
        this.r.F = v ? this.r.F | _models__WEBPACK_IMPORTED_MODULE_1__["CPUFlag"][flag] : this.r.F & ~_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlag"][flag];
    }
    $resetF(flag) {
        this.r.F &= ~_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlag"][flag];
    }
    $toggleF(flag) {
        this.r.F ^= _models__WEBPACK_IMPORTED_MODULE_1__["CPUFlag"][flag];
    }
    $isHalfCarry(a, b) {
        return (((a & 0xF) + (b & 0xF)) & 0x10) == 0x10;
    }
    $isCarry(a, b) {
        return (((a & 0xFF) + (b & 0xFF)) & 0x70) == 0x70;
    }
    $isBit15Carry(a, b) {
        return ((a & 0xFFFF) + (b & 0xFFFF)) > 0x7FFF;
    }
    $isBit11Carry(a, b) {
        return (((a & 0xFFFF) + (b & 0xFFFF)) & 0x0FFF) === 0x0FFF;
    }
    $isBit3Borrow(a, b) {
        return this.$isHalfCarry(a, -b);
    }
    $isBit4Borrow(a, b) {
        return this.$isCarry(a, -b);
    }
    INC_RR(r1, r2) {
        const r3 = this.cpu.read16(r1, r2);
        this.cpu.write16(r3 + 1, r1, r2);
        this.$incClock(8);
        this.$incPC(1);
    }
    INC_RR_mem(r1, r2) {
        let v = this.cpu.read16(r1, r2) + 1;
        let newV = v + 1;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !newV);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(v, 1)));
        this.cpu.write16(v, r1, r2);
        this.$incClock(12);
        this.$incPC(1);
    }
    INC_SP() {
        this.r.SP++;
        this.$incClock(8);
        this.$incPC(1);
    }
    LD_RR_d16(r1h, r1l) {
        this.cpu.write16(this.mmu.getImmediate16(this.r.PC + 1), r1h, r1l);
        this.$incClock(9);
        this.$incPC(3);
    }
    LD_RR_SPd8(r1h, r1l) {
        this.cpu.write16(this.r.SP + _utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].getSignedValue8(this.mmu.getImmediate8(this.r.PC)), r1h, r1l);
        this.$incClock(12);
        this.$incPC(2);
    }
    LD_SP_d16() {
        this.r.SP = this.mmu.getImmediate16(this.r.PC);
        this.$incClock(9);
        this.$incPC(1);
    }
    LD_SP_RR(r1h, r1l) {
        this.r.SP = this.cpu.read16(r1h, r1l);
        this.$incClock(8);
        this.cpu.register.SP += 1;
    }
    LD_RR_nn(r1, r2) {
        this.cpu.write16(this.mmu.getImmediate8(this.r.PC), r1, r2);
        this.$incClock(12);
        this.cpu.register.SP += 1;
    }
    LD_RR_R(r1h, r1l, r2, increment, decrement) {
        const pointer = this.cpu.read16(r1h, r1l);
        let v = this.cpu.read8(r2);
        if (increment)
            v++;
        if (decrement)
            v--;
        this.mmu.write(pointer, v);
        this.$incClock(8);
        this.$incPC(1);
    }
    LD_R_RR(r1, r2h, r2l, increment, decrement) {
        const pointer = this.cpu.read16(r2h, r2l);
        let v = this.mmu.read(pointer);
        this.cpu.write8(v, r1);
        this.cpu.write16(increment ? pointer + 1 : decrement ? pointer - 1 : pointer, r2h, r2l);
        this.$incClock(8);
        this.$incPC(1);
    }
    LD_R_R(r1, r2) {
        this.cpu.write8(this.cpu.read8(r2), r1);
        this.$incClock(4);
        this.$incPC(1);
    }
    LD_a16_R(r1) {
        this.mmu.write(0xFF00 + this.mmu.getImmediate16(this.r.PC), this.cpu.read8(r1));
        this.$incClock(16);
        this.$incPC(3);
    }
    LD_R_a16(r1) {
        this.cpu.write8(this.mmu.read(0xFF00 + this.mmu.getImmediate16(this.r.PC)), r1);
        this.$incClock(16);
        this.$incPC(3);
    }
    LD_a16_SP() {
        const spHb = (this.cpu.register.SP >> 8) & 0xFF;
        const spLb = this.cpu.register.SP & 0xFF;
        this.mmu.write(this.mmu.getImmediate16(this.r.PC), spLb);
        this.mmu.write(this.mmu.getImmediate16(this.r.PC) + 1, spHb);
        this.$incClock(20);
        this.$incPC(3);
    }
    LD_a8_R(r1) {
        const v = this.cpu.read8(r1);
        this.mmu.write(0xFF00 + this.mmu.getImmediate8(this.r.PC), v);
        this.$incClock(12);
        this.$incPC(2);
    }
    LD_R_a8(r1) {
        const v = this.mmu.read(0xFF00 + this.mmu.getImmediate8(this.r.PC));
        this.cpu.write8(v, r1);
        this.$incClock(12);
        this.$incPC(2);
    }
    LD_C_R(r1) {
        const v = this.cpu.read8(r1);
        this.mmu.write(0xFF00 + this.mmu.read(this.cpu.read8('C')), v);
        this.$incClock(8);
        this.$incPC(1);
    }
    LD_R_C(r1) {
        const v = this.mmu.read(0xFF00 + this.mmu.read(this.cpu.read8('C')));
        this.cpu.write8(v, r1);
        this.$incClock(8);
        this.$incPC(1);
    }
    RL_R(r1, bytes, cycles) {
        const leftBit7 = this.cpu.read8(r1) & 0x80;
        const v = (this.cpu.read8(r1) << 1) | ((this.r.F & _models__WEBPACK_IMPORTED_MODULE_1__["CPUFlag"].C) >> 4);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, leftBit7 & 1);
        this.$incClock(cycles);
        this.$incPC(bytes);
    }
    RL_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const leftBit7 = this.mmu.read(pointer) & 0x80;
        const v = (this.mmu.read(pointer) << 1) | ((this.r.F & _models__WEBPACK_IMPORTED_MODULE_1__["CPUFlag"].C) >> 4);
        this.mmu.write(pointer, v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, leftBit7 & 1);
        this.$incClock(8);
        this.$incPC(2);
    }
    RRC_R(r1, bytes, cycles) {
        const rightBit0 = this.cpu.read8(r1) & 0x1;
        const v = (this.cpu.read8(r1) >> 1) | (rightBit0 << 7);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, rightBit0 & 1);
        this.$incClock(cycles);
        this.$incPC(bytes);
    }
    RRC_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const rightBit0 = this.mmu.read(pointer) & 0x1;
        const v = (this.mmu.read(pointer) >> 1) | (rightBit0 << 7);
        this.mmu.write(v, pointer);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, rightBit0 & 1);
        this.$incClock(8);
        this.$incPC(2);
    }
    RR_R(r1, bytes, cycles) {
        const rightBit0 = this.cpu.read8(r1) & 0x1;
        const v = (this.cpu.read8(r1) >> 1) | (rightBit0 << 7);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, rightBit0 & 1);
        this.$incClock(cycles);
        this.$incPC(bytes);
    }
    RR_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const rightBit0 = this.mmu.read(pointer) & 0x1;
        const v = (this.mmu.read(pointer) >> 1) | (rightBit0 << 7);
        this.mmu.write(pointer, v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, rightBit0 & 1);
        this.$incClock(16);
        this.$incPC(2);
    }
    RLC_R(r1, bytes, cycles) {
        const leftBit7 = this.cpu.read8(r1) & 0x80;
        const v = (this.cpu.read8(r1) << 1) | (leftBit7 >> 7);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, leftBit7 & 1);
        this.$incClock(cycles);
        this.$incPC(bytes);
    }
    RLC_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const address = this.mmu.read(pointer);
        const leftBit7 = address & 0x80;
        const v = (address << 1) | (leftBit7 >> 7);
        this.mmu.write(pointer, v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, leftBit7 & 1);
        this.$incClock(16);
        this.$incPC(2);
    }
    ADC_R_d8(r1) {
        const pointer = this.cpu.read8(r1);
        const v = ((this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C) ? 1 : 0) + this.mmu.read(pointer)) & 0xFF;
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isCarry(this.cpu.read8(r1), v)));
        this.$incClock(8);
        this.$incPC(2);
    }
    ADC_R_R(r1, r2) {
        const v = ((this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C) ? 1 : 0) + this.cpu.read8(r2)) & 0xFF;
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isCarry(this.cpu.read8(r1), v)));
        this.$incClock(8);
        this.$incPC(1);
    }
    ADC_R_RR(r1, r2h, r2l) {
        const pointer = this.cpu.read16(r2h, r2l);
        const v = ((this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C) ? 1 : 0) + this.mmu.read(pointer)) & 0xFF;
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isCarry(this.cpu.read8(r1), v)));
        this.$incClock(8);
        this.$incPC(1);
    }
    ADD_R_d8(r1) {
        const v = (this.cpu.read8(r1) + this.mmu.getImmediate8(this.r.PC)) & 0xFF;
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isCarry(this.cpu.read8(r1), v)));
        this.$incClock(4);
        this.$incPC(1);
    }
    ADD_SP_d8() {
        const v = (_utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].getSignedValue8(this.mmu.getImmediate8(this.r.PC)) + this.r.SP) & 0xFF;
        this.r.SP = v;
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(this.r.SP, v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isCarry(this.r.SP, v)));
        this.$incClock(16);
        this.$incPC(2);
    }
    ADD_R_R(r1, r2) {
        const v = (this.cpu.read8(r1) + this.cpu.read8(r2)) & 0xFF;
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isCarry(this.cpu.read8(r1), v)));
        this.$incClock(4);
        this.$incPC(1);
    }
    ADD_R_RR(r1, r2h, r2l) {
        const pointer = this.cpu.read16(r2h, r2l);
        const v = this.mmu.read(pointer) + this.cpu.read8(r1);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isCarry(this.cpu.read8(r1), v)));
        this.$incClock(8);
        this.$incPC(1);
    }
    ADD_RR_RR(r1h, r1l, r2h, r2l) {
        const r1 = this.cpu.read16(r1h, r1l) & 0xFFFF;
        const r2 = this.cpu.read16(r2h, r2l) & 0xFFFF;
        const v = (r1 + r2) & 0xFFFF;
        this.cpu.write16(v, r1h, r1l);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isBit11Carry(r1, v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isBit15Carry(r1, v)));
        this.$incClock(8);
        this.$incPC(2);
    }
    ADD_RR_SP(r1h, r1l) {
        const r1 = this.cpu.read16(r1h, r1l) & 0xFFFF;
        const v = (this.r.SP + r1) & 0xFFFF;
        this.cpu.write16(v, r1h, r1l);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isBit11Carry(r1, v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.$isBit15Carry(r1, v)));
        this.$incClock(8);
        this.$incPC(2);
    }
    AND() {
        const v = this.mmu.getImmediate8(this.r.PC) & this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, 1);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(8);
        this.$incPC(2);
    }
    AND_R(r1) {
        const v = this.cpu.read8(r1) & this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, 1);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(4);
        this.$incPC(1);
    }
    AND_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const v = this.mmu.read(pointer) & this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, 1);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(8);
        this.$incPC(1);
    }
    BIT_b_R(bit, r1) {
        const rBit = this.cpu.read8(r1) & bit;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !rBit);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, 1);
        this.$incClock(8);
        this.$incPC(2);
    }
    BIT_b_RR(bit, r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const rBit = this.mmu.read(pointer) & bit;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !rBit);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, 1);
        this.$incClock(16);
        this.$incPC(2);
    }
    CALL_F(flag) {
        if (this.$getF(flag)) {
            this.r.SP -= 2;
            this.mmu.write(this.r.SP, this.r.PC + 2);
            this.r.PC = this.mmu.getImmediate8(this.r.PC);
        }
        else {
            this.$incPC(2);
        }
        this.$incClock(12);
    }
    CALL() {
        this.r.SP -= 2;
        this.mmu.write(this.r.SP, this.r.PC + 2);
        this.r.PC = this.mmu.getImmediate16(this.r.PC);
        this.$incClock(24);
    }
    CALL_NF(flag) {
        if (!this.$getF(flag)) {
            this.r.SP -= 2;
            this.mmu.write(this.r.SP, this.r.PC + 2);
            this.r.PC = this.mmu.getImmediate8(this.r.PC);
        }
        else {
            this.$incPC(2);
        }
        this.$incClock(12);
    }
    DEC_R(r1) {
        const v = this.cpu.read8(r1);
        const newV = (v - 1) & 0xFF;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !newV);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(v, 1)));
        this.cpu.write8(newV, r1);
        this.$incClock(4);
        this.$incPC(1);
    }
    DEC_RR(r1, r2) {
        const v = (this.cpu.read16(r1, r2) - 1) & 0xFFFF;
        this.cpu.write16(v, r1, r2);
        this.$incClock(4);
        this.$incPC(1);
    }
    DEC_SP() {
        this.r.SP -= 1;
        this.$incClock(4);
        this.$incPC(1);
    }
    DEC_RR_mem(r1, r2) {
        let v = this.cpu.read16(r1, r2) & 0xFFFF;
        let newV = (v - 1) & 0xFFFF;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !newV);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(v, 1)));
        this.cpu.write16(newV, r1, r2);
        this.$incClock(12);
        this.$incPC(1);
    }
    DI() {
        this.cpu.IME = 0;
        this.$incClock(4);
        this.$incPC(1);
    }
    EI() {
        this.cpu.IME = 1;
        this.$incClock(4);
        this.$incPC(1);
    }
    INC_R(r1) {
        const v = this.cpu.read8(r1);
        const newV = (v + 1) & 0xFF;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !newV);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (this.$isHalfCarry(v, 1)));
        this.cpu.write8(newV, r1);
        this.$incClock(4);
        this.$incPC(1);
    }
    LD_R_d8(r1) {
        this.cpu.write8(this.mmu.getImmediate8(this.r.PC + 1), r1);
        this.$incClock(8);
        this.$incPC(2);
    }
    JR() {
        this.$incClock(12);
        const s8 = _utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].getSignedValue8(this.mmu.getImmediate8(this.r.PC));
        this.$incPC(s8);
    }
    JR_NF(flag) {
        if (this.$getF(flag)) {
            this.$incClock(8);
            this.$incPC(1);
        }
        else {
            const s8 = _utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].getSignedValue8(this.mmu.getImmediate8(this.r.PC + 1));
            this.$incClock(12);
            this.$incPC(2 + s8);
        }
    }
    JR_F(flag) {
        if (!this.$getF(flag)) {
            this.$incClock(8);
            this.$incPC(2);
        }
        else {
            const s8 = _utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].getSignedValue8(this.mmu.getImmediate8(this.r.PC + 1));
            this.$incClock(12);
            this.$incPC(2 + s8);
        }
    }
    JP() {
        this.$incClock(16);
        this.$incPC(1);
        this.r.PC = this.mmu.getImmediate16(this.r.PC);
    }
    JP_F(flag) {
        if (this.$getF(flag)) {
            this.cpu.register.PC = this.mmu.getImmediate16(this.r.PC + 1);
        }
        this.$incPC(1);
        this.$incClock(12);
    }
    JP_NF(flag) {
        if (!this.$getF(flag)) {
            this.cpu.register.PC = this.mmu.getImmediate16(this.r.PC);
        }
        else {
            this.cpu.register.PC++;
        }
        this.$incClock(12);
    }
    JP_RR(r1h, r1l) {
        this.r.PC = this.cpu.read16(r1h, r1l);
        this.$incClock(4);
        this.$incPC(1);
    }
    DAA() {
        let correction = 0;
        let v = this.r.A;
        if (this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H) || (!this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N) && (v & 0xf) > 9)) {
            correction |= 0x6;
        }
        if (this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H) || (!this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N) && (v > 0x99))) {
            correction |= 0x60;
            this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, 1);
        }
        v += (this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N) ? -correction : correction) & 0xFF;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$incClock(4);
        this.$incPC(1);
    }
    CP() {
        const v = this.cpu.read8('A') - this.mmu.getImmediate8(this.r.PC);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.cpu.read8('A') < this.mmu.getImmediate8(this.r.PC)));
        this.$incClock(8);
        this.$incPC(2);
    }
    CPL() {
        this.r.A = ~this.r.A;
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, 1);
        this.$incClock(4);
        this.$incPC(1);
    }
    CCF() {
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        if (this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C)) {
            this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        }
        else {
            this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, 1);
        }
        this.$incClock(4);
        this.$incPC(1);
    }
    SCF() {
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, 1);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$incClock(4);
        this.$incPC(1);
    }
    CP_R(r1) {
        const v = this.cpu.read8('A') - this.cpu.read8(r1);
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.cpu.read8('A') < this.cpu.read8(r1)));
        this.$incClock(4);
        this.$incPC(1);
    }
    CP_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const v = this.cpu.read8('A') - this.mmu.read(pointer);
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (this.cpu.read8('A') < this.mmu.read(pointer)));
        this.$incClock(8);
        this.$incPC(1);
    }
    HALT() {
        this.$incClock(4);
        this.$incPC(1);
    }
    OR() {
        const v = this.mmu.getImmediate8(this.r.PC) ^ this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(8);
        this.$incPC(2);
    }
    OR_R(r1) {
        const v = this.cpu.read8(r1) ^ this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(4);
        this.$incPC(1);
    }
    OR_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const v = this.mmu.read(pointer) ^ this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(8);
        this.$incPC(1);
    }
    NOP() {
        this.$incClock(4);
        this.$incPC(1);
    }
    POP_RR(r1h, r1l) {
        this.cpu.write8(this.mmu.read(this.r.SP || 0), r1l);
        this.r.SP++;
        this.cpu.write8(this.mmu.read(this.r.SP || 0), r1h);
        this.r.SP++;
        this.$incClock(12);
        this.$incPC(1);
    }
    PUSH_RR(r1h, r1l) {
        this.r.SP--;
        this.mmu.write(this.r.SP, this.cpu.read8(r1h));
        this.r.SP--;
        this.mmu.write(this.r.SP, this.cpu.read8(r1l));
        this.$incClock(16);
        this.$incPC(1);
    }
    RET() {
        const v = this.mmu.getImmediate16(this.r.SP);
        this.cpu.register.PC = v;
        this.r.SP += 2;
        this.$incClock(16);
    }
    RETI() {
        this.cpu.IME = 1;
        this.r.PC = this.mmu.read(this.r.SP);
        this.r.SP += 2;
        this.$incClock(16);
        this.$incPC(1);
    }
    RET_F(flag) {
        if (this.$getF(flag)) {
            this.r.PC = this.mmu.read(this.r.SP);
            this.r.SP += 2;
        }
        this.$incClock(20);
        this.$incPC(2);
    }
    RET_NF(flag) {
        if (!this.$getF(flag)) {
            this.r.PC = this.mmu.read(this.r.SP);
            this.r.SP += 2;
        }
        this.$incClock(8);
        this.$incPC(2);
    }
    RES_b_R(bit, r1) {
        const v = this.cpu.read8(r1) & ~bit;
        this.cpu.write8(v, r1);
        this.$incClock(8);
        this.$incPC(2);
    }
    RES_b_RR(bit, r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const v = this.mmu.read(pointer) & ~bit;
        this.mmu.write(pointer, v);
        this.$incClock(16);
        this.$incPC(2);
    }
    RST(byteNr) {
        this.r.SP -= 1;
        this.mmu.write(this.r.SP, (this.r.PC >> 4) & 0xF);
        this.r.SP -= 1;
        this.mmu.write(this.r.SP, this.r.PC & 0xF);
        this.cpu.register.PC = byteNr;
        this.$incClock(16);
    }
    SET_b_R(bit, r1) {
        const v = this.cpu.read8(r1) | bit;
        this.cpu.write8(v, r1);
        this.$incClock(8);
        this.$incPC(2);
    }
    SET_b_RR(bit, r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const v = this.mmu.read(pointer) | bit;
        this.mmu.write(pointer, v);
        this.$incClock(16);
        this.$incPC(2);
    }
    SLA_R(r1) {
        const r = this.cpu.read8(r1);
        const oldBit7 = r & 0x80;
        const v = (r << 1);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, oldBit7 && 1);
        this.$incClock(8);
        this.$incPC(2);
    }
    SLA_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const m = this.mmu.read(pointer);
        const oldBit7 = m & 0x80;
        const v = (m << 1);
        this.mmu.write(pointer, v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, oldBit7 & 1);
        this.$incClock(16);
        this.$incPC(2);
    }
    SRA_R(r1) {
        const r = this.cpu.read8(r1);
        const oldBit0 = r & 0x01;
        const oldBit7 = r & 0x80;
        const v = (r >> 1) & oldBit7;
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, oldBit0 & 1);
        this.$incClock(8);
        this.$incPC(2);
    }
    SRA_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const m = this.mmu.read(pointer);
        const oldBit0 = m & 0x01;
        const oldBit7 = m & 0x80;
        const v = (m >> 1) & oldBit7;
        this.mmu.write(pointer, v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, oldBit0 & 1);
        this.$incClock(16);
        this.$incPC(2);
    }
    SRL_R(r1) {
        const r = this.cpu.read8(r1);
        const oldBit0 = r & 0x01;
        const v = (r >> 1);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, oldBit0 & 1);
        this.$incClock(8);
        this.$incPC(2);
    }
    SRL_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const m = this.mmu.read(pointer);
        const oldBit0 = m & 0x01;
        const v = (m >> 1);
        this.mmu.write(pointer, v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, oldBit0 & 1);
        this.$incClock(16);
        this.$incPC(2);
    }
    STOP() {
        this.$incClock(4);
        this.$incPC(2);
    }
    SUB() {
        const v = (this.cpu.read8('A') - this.mmu.getImmediate8(this.r.PC)) & 0xFF;
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (!this.$isBit3Borrow(this.cpu.read8('A'), v)));
        this.$incClock(8);
        this.$incPC(2);
    }
    SUB_R(r1) {
        const v = (this.cpu.read8('A') - this.cpu.read8(r1)) & 0xFF;
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (!this.$isBit3Borrow(this.cpu.read8('A'), v)));
        this.$incClock(4);
        this.$incPC(1);
    }
    SUB_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const v = (this.cpu.read8('A') - this.mmu.read(pointer)) & 0xFF;
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (!this.$isBit3Borrow(this.cpu.read8('A'), v)));
        this.$incClock(8);
        this.$incPC(1);
    }
    SBC_R_R(r1, r2) {
        const v = this.cpu.read8(r2) + (this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C) ? 1 : 0);
        this.cpu.write8(this.cpu.read8(r1) - v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (!this.$isBit3Borrow(this.cpu.read8(r1), v)));
        this.$incClock(4);
        this.$incPC(1);
    }
    SBC_R_d8(r1) {
        const v = this.mmu.getImmediate8(this.r.PC) + (this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C) ? 1 : 0);
        this.cpu.write8(this.cpu.read8(r1) - v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (!this.$isBit3Borrow(this.cpu.read8(r1), v)));
        this.$incClock(8);
        this.$incPC(2);
    }
    SBC_R_RR(r1, r2h, r2l) {
        const pointer = this.cpu.read16(r2h, r2l);
        const v = this.mmu.read(pointer) + (this.$getF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C) ? 1 : 0);
        this.cpu.write8(this.cpu.read8(r1) - v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N, 1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H, (!this.$isBit4Borrow(this.cpu.read8(r1), v)));
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C, (!this.$isBit3Borrow(this.cpu.read8(r1), v)));
        this.$incClock(8);
        this.$incPC(1);
    }
    SWAP_R(r1) {
        const lowBits = this.cpu.read8(r1) & 0x0F;
        const highBits = this.cpu.read8(r1) & 0xF0;
        const v = ((lowBits << 4) | (highBits >> 4) & 0xFF);
        this.cpu.write8(v, r1);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(8);
        this.$incPC(2);
    }
    SWAP_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const m = this.mmu.read(pointer);
        const lowBits = m & 0x0F;
        const highBits = m & 0xF0;
        const v = ((lowBits << 4) | (highBits >> 4) & 0xFF);
        this.mmu.write(pointer, v);
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(16);
        this.$incPC(2);
    }
    XOR() {
        const v = this.mmu.getImmediate8(this.r.PC) ^ this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(8);
        this.$incPC(2);
    }
    XOR_R(r1) {
        const v = this.cpu.read8(r1) ^ this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(4);
        this.$incPC(1);
    }
    XOR_RR(r1h, r1l) {
        const pointer = this.cpu.read16(r1h, r1l);
        const v = this.mmu.read(pointer) ^ this.cpu.read8('A');
        this.cpu.write8(v, 'A');
        this.$setF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].Z, !v);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].N);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].H);
        this.$resetF(_models__WEBPACK_IMPORTED_MODULE_1__["CPUFlagType"].C);
        this.$incClock(8);
        this.$incPC(1);
    }
}



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MMU", function() { return MMU; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ICartridgeType;
(function (ICartridgeType) {
    ICartridgeType[ICartridgeType["ROM_ONLY"] = 0] = "ROM_ONLY";
    ICartridgeType[ICartridgeType["MBC1"] = 1] = "MBC1";
    ICartridgeType[ICartridgeType["MBC1_RAM"] = 2] = "MBC1_RAM";
    ICartridgeType[ICartridgeType["MBC1_RAM_BATTERY"] = 3] = "MBC1_RAM_BATTERY";
    ICartridgeType[ICartridgeType["MBC2"] = 5] = "MBC2";
    ICartridgeType[ICartridgeType["MBC2_BATTERY"] = 6] = "MBC2_BATTERY";
    ICartridgeType[ICartridgeType["ROM_RAM"] = 8] = "ROM_RAM";
    ICartridgeType[ICartridgeType["ROM_RAM_BATTERY"] = 9] = "ROM_RAM_BATTERY";
    ICartridgeType[ICartridgeType["MMM01"] = 11] = "MMM01";
    ICartridgeType[ICartridgeType["MMM01_RAM"] = 12] = "MMM01_RAM";
    ICartridgeType[ICartridgeType["MMM01_RAM_BATTERY"] = 13] = "MMM01_RAM_BATTERY";
    ICartridgeType[ICartridgeType["MBC3_TIMER_BATTERY"] = 15] = "MBC3_TIMER_BATTERY";
    ICartridgeType[ICartridgeType["MBC3_TIMER_RAM_BATTERY"] = 16] = "MBC3_TIMER_RAM_BATTERY";
    ICartridgeType[ICartridgeType["MBC3"] = 17] = "MBC3";
    ICartridgeType[ICartridgeType["MBC3_RAM"] = 18] = "MBC3_RAM";
    ICartridgeType[ICartridgeType["MBC3_RAM_BATTERY"] = 19] = "MBC3_RAM_BATTERY";
    ICartridgeType[ICartridgeType["MBC5"] = 25] = "MBC5";
    ICartridgeType[ICartridgeType["MBC5_RAM"] = 26] = "MBC5_RAM";
    ICartridgeType[ICartridgeType["MBC5_RAM_BATTERY"] = 27] = "MBC5_RAM_BATTERY";
    ICartridgeType[ICartridgeType["MBC5_RUMBLE"] = 28] = "MBC5_RUMBLE";
    ICartridgeType[ICartridgeType["MBC5_RUMBLE_RAM"] = 29] = "MBC5_RUMBLE_RAM";
    ICartridgeType[ICartridgeType["MBC5_RUMBLE_BATTERY"] = 30] = "MBC5_RUMBLE_BATTERY";
    ICartridgeType[ICartridgeType["MBC6"] = 32] = "MBC6";
    ICartridgeType[ICartridgeType["MBC7_SENSOR_RUMBLE_RAM_BATTERY"] = 34] = "MBC7_SENSOR_RUMBLE_RAM_BATTERY";
    ICartridgeType[ICartridgeType["POCKET_CAMERA"] = 252] = "POCKET_CAMERA";
    ICartridgeType[ICartridgeType["BANDAI_TAMA5"] = 253] = "BANDAI_TAMA5";
    ICartridgeType[ICartridgeType["HUC3"] = 254] = "HUC3";
    ICartridgeType[ICartridgeType["HUC3_RAM_BATTERY"] = 255] = "HUC3_RAM_BATTERY";
})(ICartridgeType || (ICartridgeType = {}));
class MMU {
    constructor() {
        this.BOOT_ROM = new Uint8Array([
            0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E,
            0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0,
            0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B,
            0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,
            0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,
            0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,
            0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,
            0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,
            0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xF2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,
            0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17,
            0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,
            0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,
            0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,
            0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3c, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x4C,
            0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20,
            0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50
        ]);
        this.ROMBank = 0x4000;
        this.RAMBank = 0x0000;
        this.cartridgeType = 0x00;
        this.skipBios = true;
        this.IE = 0;
        this.IF = 0;
        this.bios = this.BOOT_ROM || new Uint8Array(255);
        this.IO = new Uint8Array(127);
        this.OAM = new Uint8Array(159);
        this.ROM = new Uint16Array(1024 * 16);
        this.SROM = new Uint16Array(1024 * 16);
        this.ERAM = new Uint16Array(1024 * 8);
        this.HRAM = new Uint8Array(126);
        this.WRAM = new Uint16Array(1024 * 8);
        this.VRAM = new Uint16Array(1024 * 16);
        this.metadata = {
            title: '',
            nintendoLogo: null,
            size: 0,
            version: 0,
            cartridgeType: 0x00,
        };
    }
    static get shared() {
        if (!this._shared)
            this._shared = new MMU();
        return this._shared;
    }
    loadNintendoLogo() {
        const sprites = [];
    }
    setROMMetadata(romSize) {
        let title = '';
        let publisher = '';
        let nintendoLogo = new Uint8Array(48);
        for (let i = 0; i < 47; i++) {
            nintendoLogo[i] = this.ROM[0x104 + i];
        }
        for (let i = 0; i < 15; i++) {
            title += this.ROM[0x134 + i] !== 0x00 ? String.fromCharCode(this.ROM[0x134 + i]) : '';
        }
        for (let i = 0; i < 1; i++) {
            publisher += this.ROM[0x144 + i] !== 0x00 ? String.fromCharCode(this.ROM[0x144 + i]) : '';
        }
        this.metadata = {
            title,
            nintendoLogo,
            size: romSize,
            version: this.ROM[0x14C],
            cartridgeType: this.ROM[0x147]
        };
        console.log('ROM metadata:', this.metadata);
    }
    loadROMIntoMemory(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const romData = this.rawRomData = new Uint16Array(yield this.fetchROM(path));
                for (let address = 0; address < romData.byteLength; address++) {
                    if (address <= 0x00FF && !this.skipBios) {
                        this.bios[address] = romData[address];
                    }
                    else if (address >= 0x0000 && address <= 0x3FFF) {
                        this.ROM[address] = romData[address];
                    }
                    else if (address >= 0x4000 && address <= 0x7FFF) {
                        this.SROM[address - 0x4000] = romData[address];
                    }
                }
                this.setROMMetadata(romData.byteLength);
            }
            catch (err) {
                console.warn('An error occurred while loading the ROM;', err);
            }
        });
    }
    fetchROM(romName) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.onload = (e) => resolve(new Uint8Array(http.response));
            http.onerror = (err) => reject(err);
            http.responseType = 'arraybuffer';
            http.open('GET', `./${romName}`);
            http.send();
        });
    }
    loadROMByCartridgeType(byte) {
        switch (byte) {
            case ICartridgeType.ROM_ONLY:
                break;
            default: throw `Unsupported cartridge type: (${byte})`;
        }
    }
    switchROMBank(romBankNr = 0) {
        this.SROM[0x0000] = this.rawRomData[this.ROMBank * romBankNr];
    }
    reset() {
    }
    getImmediate8(pc) {
        return this.read(pc) & 0xFF;
    }
    getImmediate16(pc) {
        return (this.read(pc) | (this.read(pc + 1) << 8)) & 0xFFFF;
    }
    read(address) {
        if (address < 0x0000 || address > 0xFFFF)
            throw new Error(`Read attempt: Memory address ${address} is out of memory bounds`);
        if (address >= 0x0000 && address <= 0x3FFF) {
            if (!this.skipBios) {
                if (address <= 0x00FF) {
                    return this.bios[address];
                }
                else if (this.cpu.register.PC == 0x0100) {
                    this.skipBios = true;
                }
            }
            return this.ROM[address];
        }
        else if (address >= 0x4000 && address <= 0x7FFF) {
            return this.SROM[address - 0x4000];
        }
        else if (address >= 0x8000 && address <= 0x9FFF) {
            return this.VRAM[address - 0x8000];
        }
        else if (address >= 0xA000 && address <= 0xBFFF) {
            return this.ERAM[address - 0xA000];
        }
        else if (address >= 0xC000 && address <= 0xCFFF) {
            return this.WRAM[address - 0xC000];
        }
        else if (address >= 0xD000 && address <= 0xDFFF) {
            return this.WRAM[address - 0xD000];
        }
        else if (address >= 0xE000 && address <= 0xFDFF) {
            return 0;
        }
        else if (address >= 0xFE00 && address <= 0xFE9F) {
            return this.OAM[address - 0xFE00];
        }
        else if (address >= 0xFEA0 && address <= 0xFEFF) {
            return 0;
        }
        else if (address >= 0xFF00 && address <= 0xFF7F) {
            if (address === 0xFF0F)
                return this.IF;
            switch (address & 0x00F0) {
                case 0x40:
                case 0x50:
                case 0x60:
                case 0x70:
                    return this.gpu.read(address);
                default:
                    return 0;
            }
        }
        else if (address >= 0xFF80 && address <= 0xFFFE) {
            console.log('R: 0xFF80 - 0xFFFE --> High RAM (HRAM)', `0x${address.toString(16)}`);
            return this.HRAM[(address - 0xFF80) & 0x7F];
        }
        else if (address == 0xFFFF) {
            return this.IE;
        }
        else {
            throw `Unhandled address: ${address}`;
        }
    }
    write(address, value) {
        if (address === 0x81)
            console.log('output blargg:', address);
        if (address < 0x0000 || address > 0xFFFF)
            throw new Error(`Write attempt: Memory address ${address} is out of memory bounds`);
        if (address >= 0x0000 && address <= 0x3FFF) {
            if (!this.skipBios) {
                if (address <= 0x00FF) {
                    this.bios[address - 0x00FF] = value;
                }
                else {
                    this.ROM[address] = value;
                }
            }
            else {
                this.ROM[address] = value;
            }
        }
        else if (address >= 0x4000 && address <= 0x7FFF) {
            this.SROM[address - 0x4000] = value;
        }
        else if (address >= 0x8000 && address <= 0x9FFF) {
            this.VRAM[address - 0x8000] = value;
            if (address <= 0x9000) {
                this.VRAM[address & 0x1FFF - 0x8000] = value;
                this.gpu.updateTile(address, value);
            }
        }
        else if (address >= 0xA000 && address <= 0xBFFF) {
            this.ERAM[address - 0xA000] = value;
        }
        else if (address >= 0xC000 && address <= 0xCFFF) {
            this.WRAM[address - 0xC000] = value;
        }
        else if (address >= 0xD000 && address <= 0xDFFF) {
            this.WRAM[address - 0xD000] = value;
        }
        else if (address >= 0xE000 && address <= 0xFDFF) {
        }
        else if (address >= 0xFE00 && address <= 0xFE9F) {
            this.OAM[address - 0xFE00] = value;
        }
        else if (address >= 0xFEA0 && address <= 0xFEFF) {
        }
        else if (address >= 0xFF00 && address <= 0xFF7F) {
            console.log('W: 0xFF00 - 0xFF7F --> I/O registers', `0x${address.toString(16)}`, value.toString(16));
            switch (address & 0x00F0) {
                case 0x40:
                case 0x50:
                case 0x60:
                case 0x70:
                    this.gpu.write(address, value);
                    break;
            }
            this.IO[address - 0xFF00] = value & 0xFF;
        }
        else if (address >= 0xFF80 && address <= 0xFFFE) {
            console.log('W: 0xFF80 - 0xFFFE --> High RAM (HRAM)', `0x${address.toString(16)}`, value.toString(16));
            this.HRAM[(address - 0xFF80) & 0x7F] = value & 0xFF;
        }
        else if (address == 0xFFFF) {
        }
        else {
            throw `Unhandled address: ${address}`;
        }
    }
}



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
class Utils {
    static getSignedValue8(value = 0) {
        return value > 127 ? value = -((~value + 1) & 255) : value;
    }
}
Utils.decToHex = (decimal) => {
    return (decimal).toString(16);
};
Utils.decToBin = (decimal) => {
    return (decimal >>> 0).toString(2);
};
Utils.binToDec = (binary) => {
    return parseInt(binary, 2);
};
Utils.binToHex = (binary) => {
    return parseInt(binary, 2).toString(16);
};
Utils.hexToBin = (hexadecimal) => {
    return parseInt(hexadecimal, 16).toString(2);
};
Utils.hexToDec = (hexadecimal) => {
    return parseInt(hexadecimal, 16);
};



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Audio", function() { return Audio; });
class Audio {
    play() {
    }
    stop() {
    }
}



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GPU", function() { return GPU; });
/* harmony import */ var _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);


class GPU {
    constructor(scale = _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_0__["GPUSettings"].SCALE) {
        this.MAX_NR_OF_TILES = 384;
        this.TILE_SIZE = 8;
        this.mode = 0;
        this.modeClock = 0;
        this.line = 0;
        this.scX = 0;
        this.scY = 0;
        this.tileset = [];
        this.switchBG = false;
        this.switchLCD = false;
        this.bgMap = false;
        this.bgTile = false;
        this.palette = {
            0: [255, 255, 255],
            1: [192, 192, 192],
            2: [96, 96, 96],
            3: [0, 0, 0]
        };
        this.scale = scale;
        this.canvas = document.querySelector('main[data-app="mboy"] > canvas[id="__SCREEN__"]');
        this.canvas.width = _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_0__["GPUSettings"].WIDTH * this.scale;
        this.canvas.height = _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_0__["GPUSettings"].HEIGHT * this.scale;
        this.context = this.canvas.getContext('2d');
        this.reset();
    }
    static get shared() {
        if (!this._shared)
            this._shared = new GPU();
        return this._shared;
    }
    read(address) {
        console.log('gpu read!');
        switch (address) {
            case 0xFF40:
                return ((this.switchBG ? 0x01 : 0x00) |
                    (this.bgMap ? 0x08 : 0x00) |
                    (this.bgTile ? 0x10 : 0x00) |
                    (this.switchLCD ? 0x80 : 0x00));
            case 0xFF42:
                return this.scY;
            case 0xFF43:
                return this.scX;
            case 0xFF44:
                return this.line;
            default:
                console.log('Unknown address passed to GPU read function;', `0x${address.toString(16)}`);
        }
    }
    write(address, value) {
        console.log('gpu write!');
        switch (address) {
            case 0xFF40:
                this.switchBG = !!(value & 0x01);
                this.bgMap = !!(value & 0x08);
                this.bgTile = !!(value & 0x10);
                this.switchLCD = !!(value & 0x80);
                break;
            case 0xFF42:
                this.scY = value;
                break;
            case 0xFF43:
                this.scX = value;
                break;
            case 0xFF47:
                for (let i = 0; i < 4; i++) {
                    switch ((value >> (i * 2)) & 3) {
                        case 0:
                            this.palette[i] = [255, 255, 255, 255];
                            break;
                        case 1:
                            this.palette[i] = [192, 192, 192, 255];
                            break;
                        case 2:
                            this.palette[i] = [96, 96, 96, 255];
                            break;
                        case 3:
                            this.palette[i] = [0, 0, 0, 255];
                    }
                }
                break;
            default:
                console.log('Unknown address passed to GPU read function;', `0x${address.toString(16)}`);
        }
    }
    tick() {
        this.modeClock = this.cpu.clock.M;
        switch (this.mode) {
            case _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].HORIZONTAL_BLANK.MODE:
                if (this.modeClock >= _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].HORIZONTAL_BLANK.CLOCK) {
                    this.modeClock = 0;
                    this.line++;
                    if (this.line == _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_0__["GPUSettings"].HEIGHT - 1) {
                        this.mode = _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].VERTICAL_BLANK.MODE;
                        console.log('screen (2)', this.screen);
                        this.context.putImageData(this.screen, 0, 0);
                    }
                    else {
                        this.mode = _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].SCANLINE_OAM.MODE;
                    }
                }
                break;
            case _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].VERTICAL_BLANK.MODE:
                if (this.modeClock >= _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].ONE_LINE.CLOCK) {
                    this.modeClock = 0;
                    this.line++;
                    if (this.line > 153) {
                        this.mode = _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].SCANLINE_OAM.MODE;
                        this.line = 0;
                    }
                }
                break;
            case _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].SCANLINE_OAM.MODE:
                if (this.modeClock >= _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].SCANLINE_OAM.CLOCK) {
                    this.modeClock = 0;
                    this.mode = _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].SCANLINE_VRAM.MODE;
                }
                break;
            case _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].SCANLINE_VRAM.MODE:
                if (this.modeClock >= _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].SCANLINE_VRAM.CLOCK) {
                    this.modeClock = 0;
                    this.mode = _models_gpu_mode_model__WEBPACK_IMPORTED_MODULE_1__["GPUMode"].HORIZONTAL_BLANK.MODE;
                    this.renderScan();
                }
        }
    }
    reset() {
        this.screen = this.context.createImageData(_constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_0__["GPUSettings"].WIDTH, _constants_gpu_settings_constants__WEBPACK_IMPORTED_MODULE_0__["GPUSettings"].HEIGHT);
        for (let i = 0; i < this.screen.data.length; i += 4) {
            this.screen.data[i + 0] = 255;
            this.screen.data[i + 1] = 255;
            this.screen.data[i + 2] = 255;
            this.screen.data[i + 3] = 255;
        }
        this.context.putImageData(this.screen, 0, 0);
        this.tileset = [];
        for (let i = 0; i < this.MAX_NR_OF_TILES; i++) {
            this.tileset[i] = [];
            for (let j = 0; j < this.TILE_SIZE; j++) {
                this.tileset[i][j] = [0, 0, 0, 0, 0, 0, 0, 0];
            }
        }
    }
    updateTile(address, value) {
        const addr = address & 0x1FFE;
        console.log('updateTile:', address, value);
        const tile = (addr >> 4) & 511;
        const y = (addr >> 1) & 7;
        let sx;
        for (let x = 0; x < 8; x++) {
            sx = 1 << (7 - x);
            this.tileset[tile][y][x] = ((this.mmu.VRAM[addr] & sx) ? 1 : 0) + ((this.mmu.VRAM[addr + 1] & sx) ? 2 : 0);
        }
    }
    renderScan() {
        let mapOffset = this.bgMap ? 0x1C00 : 0x1800;
        mapOffset += ((this.line + this.scY) & 255) >> 3;
        let lineOffset = (this.scX >> 3);
        var y = (this.line + this.scY) & 7;
        var x = this.scX & 7;
        var canvasOffset = this.line * 160 * 4;
        let color;
        let tile = this.mmu.VRAM[mapOffset + lineOffset];
        if (this.bgTile && tile < 128)
            tile += 256;
        for (var i = 0; i < 160; i++) {
            color = this.palette[this.tileset[tile][y][x]];
            this.screen.data[canvasOffset + 0] = color[0];
            this.screen.data[canvasOffset + 1] = color[1];
            this.screen.data[canvasOffset + 2] = color[2];
            this.screen.data[canvasOffset + 3] = color[3];
            canvasOffset += 4;
            x++;
            if (x == 8) {
                x = 0;
                lineOffset = (lineOffset + 1) & 31;
                tile = this.mmu.VRAM[mapOffset + lineOffset];
                if (this.bgTile && tile < 128)
                    tile += 256;
            }
        }
    }
}



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GPUMode", function() { return GPUMode; });
const GPUMode = {
    HORIZONTAL_BLANK: { MODE: 0, CLOCK: 204 },
    VERTICAL_BLANK: { MODE: 1, CLOCK: 4560 },
    SCANLINE_OAM: { MODE: 2, CLOCK: 80 },
    SCANLINE_VRAM: { MODE: 3, CLOCK: 172 },
    ONE_LINE: { MODE: null, CLOCK: 456 },
    FULL_FRAME: { MODE: null, CLOCK: 70224 }
};



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
class Input {
}



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Debug", function() { return Debug; });
class Debug {
    constructor() {
        this.debugging = false;
        this.serialOutput = {
            entries: [],
            str: ''
        };
    }
    static get shared() {
        if (!this._shared)
            this._shared = new Debug();
        return this._shared;
    }
    readSerialOutput() {
        const { entries } = this.serialOutput;
        const output = entries[entries.length - 1];
        const char = this.mmu.read(0xFF01);
        const endOfLine = this.mmu.read(0xFF02) === 0x81;
        if (char)
            this.serialOutput.str += String.fromCharCode(char);
        if (endOfLine) {
            this.serialOutput.entries.push(this.serialOutput.str);
            this.serialOutput.str = '';
        }
        if (this.debugging && entries && entries.length > 0)
            this.log('Serial I/O ->', output);
    }
    log(...msg) {
        console.debug(...msg);
    }
}



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21ib3kudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NwdS9jcHUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NwdS9tb2RlbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NwdS9tb2RlbHMvZmxhZy5tb2RlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2NwdS5jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9ncHUtc2V0dGluZ3MuY29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jcHUvb3Bjb2Rlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW11L21tdS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1ZGlvL2F1ZGlvLnRzIiwid2VicGFjazovLy8uL3NyYy9ncHUvZ3B1LnRzIiwid2VicGFjazovLy8uL3NyYy9ncHUvbW9kZWxzL2dwdS1tb2RlLm1vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9pbnB1dC9pbnB1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVidWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNnQztBQUNBO0FBQ0E7QUFDaEM7QUFDQTtBQUNBLG1CQUFtQiw0Q0FBRztBQUN0QixtQkFBbUIsNENBQUc7QUFDdEIsbUJBQW1CLDRDQUFHO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7Ozs7Ozs7O0FDbENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUM7QUFDa0I7QUFDUztBQUM5QjtBQUNHO0FBQ047QUFDTTtBQUNOO0FBQ0E7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNENBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0RBQU87QUFDbEMsbUJBQW1CLDRDQUFHO0FBQ3RCO0FBQ0EseUJBQXlCLDRDQUFHO0FBQzVCO0FBQ0EsbUJBQW1CLDRDQUFHO0FBQ3RCLHlCQUF5QixrREFBSztBQUM5Qix5QkFBeUIsa0RBQUs7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHlDQUF5QyxHQUFHLG9FQUFXO0FBQ3RFLDhDQUE4Qyw2RUFBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwyQ0FBMkMsT0FBTywyQ0FBMkMsT0FBTywyQ0FBMkMsT0FBTywyQ0FBMkMsT0FBTywyQ0FBMkMsT0FBTywyQ0FBMkMsT0FBTywyQ0FBMkMsT0FBTywyQ0FBMkMsUUFBUSw0Q0FBNEMsUUFBUSw0Q0FBNEMsS0FBSywyREFBMkQsR0FBRywrREFBK0QsR0FBRywrREFBK0QsR0FBRywrREFBK0Q7QUFDcnhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxtREFBVztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLG1EQUFXO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbURBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxtREFBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG1EQUFXO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbURBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxtREFBVztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLG1EQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsbURBQVc7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsbURBQVc7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxtREFBVztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLG1EQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELG1EQUFXO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsbURBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxtREFBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxtREFBVztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7Ozs7Ozs7O0FDaG1EZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFDRztBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0Y3QjtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtDQUFrQztBQUNIOzs7Ozs7OztBQ2RoQztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN1Qjs7Ozs7Ozs7QUNMdkI7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3VCOzs7Ozs7OztBQ1B2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlDO0FBQ2U7QUFDZjtBQUNqQztBQUNBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakMsbUJBQW1CLDRDQUFHO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsK0NBQU87QUFDcEM7QUFDQTtBQUNBLGtDQUFrQywrQ0FBTyxxQkFBcUIsK0NBQU87QUFDckU7QUFDQTtBQUNBLHFCQUFxQiwrQ0FBTztBQUM1QjtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDRDQUFLO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsK0NBQU87QUFDbEU7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELCtDQUFPO0FBQ3RFO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBVztBQUMxQztBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBVztBQUMxQztBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1EQUFXO0FBQzFDO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0Q0FBSztBQUN4QjtBQUNBLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0Q0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRDQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRDQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtREFBVyxvQkFBb0IsbURBQVc7QUFDakU7QUFDQTtBQUNBLHVCQUF1QixtREFBVyxvQkFBb0IsbURBQVc7QUFDakU7QUFDQSx1QkFBdUIsbURBQVc7QUFDbEM7QUFDQSx5QkFBeUIsbURBQVc7QUFDcEMsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyx1QkFBdUIsbURBQVc7QUFDbEMseUJBQXlCLG1EQUFXO0FBQ3BDO0FBQ0E7QUFDQSx1QkFBdUIsbURBQVc7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEMsbUJBQW1CLG1EQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsbURBQVc7QUFDOUQ7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsbURBQVc7QUFDN0U7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxtREFBVztBQUNsRTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixtQkFBbUIsbURBQVc7QUFDOUIsbUJBQW1CLG1EQUFXO0FBQzlCLG1CQUFtQixtREFBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1EQUFXO0FBQzlCLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBVztBQUM5QixxQkFBcUIsbURBQVc7QUFDaEMscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUIscUJBQXFCLG1EQUFXO0FBQ2hDLHFCQUFxQixtREFBVztBQUNoQyxxQkFBcUIsbURBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDbUI7Ozs7Ozs7O0FDMTVCbkI7QUFBQTtBQUFBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3QiwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3Q0FBd0M7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0EsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw4QkFBOEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELEtBQUs7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELFFBQVE7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUscUJBQXFCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFRO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxRQUFRO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLHFCQUFxQjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLHFCQUFxQjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFFBQVE7QUFDaEQ7QUFDQTtBQUNBO0FBQ2U7Ozs7Ozs7O0FDcFNmO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2lCOzs7Ozs7OztBQ3ZCakI7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpQjs7Ozs7Ozs7QUNOakI7QUFBQTtBQUFBO0FBQUE7QUFBa0U7QUFDaEI7QUFDbEQ7QUFDQSx3QkFBd0IsNkVBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw2RUFBVztBQUN2Qyw2QkFBNkIsNkVBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxRQUFRLHFCQUFxQjtBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxRQUFRLHFCQUFxQjtBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhEQUFPO0FBQ3hCLHNDQUFzQyw4REFBTztBQUM3QztBQUNBO0FBQ0EscUNBQXFDLDZFQUFXO0FBQ2hELG9DQUFvQyw4REFBTztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw4REFBTztBQUMzQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsOERBQU87QUFDeEIsc0NBQXNDLDhEQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw4REFBTztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4REFBTztBQUN4QixzQ0FBc0MsOERBQU87QUFDN0M7QUFDQSxnQ0FBZ0MsOERBQU87QUFDdkM7QUFDQTtBQUNBLGlCQUFpQiw4REFBTztBQUN4QixzQ0FBc0MsOERBQU87QUFDN0M7QUFDQSxnQ0FBZ0MsOERBQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCw2RUFBVyxRQUFRLDZFQUFXO0FBQ2pGLHVCQUF1Qiw2QkFBNkI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0EsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTs7Ozs7Ozs7QUMxTGY7QUFBQTtBQUFBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QyxxQkFBcUIsdUJBQXVCO0FBQzVDLG1CQUFtQixxQkFBcUI7QUFDeEMsb0JBQW9CLHNCQUFzQjtBQUMxQyxlQUFlLHlCQUF5QjtBQUN4QyxpQkFBaUI7QUFDakI7QUFDbUI7Ozs7Ozs7O0FDUm5CO0FBQUE7QUFBQTtBQUNBO0FBQ2lCOzs7Ozs7OztBQ0ZqQjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpQiIsImZpbGUiOiJtYm95LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgQ1BVIH0gZnJvbSAnLi9jcHUvY3B1JztcbmltcG9ydCB7IEdQVSB9IGZyb20gJy4vZ3B1L2dwdSc7XG5pbXBvcnQgeyBNTVUgfSBmcm9tICcuL21tdS9tbXUnO1xuKG5ldyBjbGFzcyBNQm95IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jcHUgPSBDUFUuc2hhcmVkO1xuICAgICAgICB0aGlzLmdwdSA9IEdQVS5zaGFyZWQ7XG4gICAgICAgIHRoaXMubW11ID0gTU1VLnNoYXJlZDtcbiAgICB9XG4gICAgYm9vdCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMubW11LmxvYWRST01JbnRvTWVtb3J5KCd0ZXN0cm9tcy9jcHVfaW5zdHJzL2luZGl2aWR1YWwvMDEtc3BlY2lhbC5nYicpO1xuICAgICAgICAgICAgdGhpcy5tbXUuZ3B1ID0gdGhpcy5ncHU7XG4gICAgICAgICAgICB0aGlzLmdwdS5jcHUgPSB0aGlzLmNwdTtcbiAgICAgICAgICAgIHRoaXMuZ3B1Lm1tdSA9IHRoaXMubW11O1xuICAgICAgICAgICAgdGhpcy5jcHUuY3ljbGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubW11LnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZ3B1LnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY3B1LnJlc2V0KCk7XG4gICAgfVxufSlcbiAgICAuYm9vdCgpXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSk7XG4iLCJpbXBvcnQgeyBDUFVGbGFnVHlwZSB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IENQVVNldHRpbmdzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NwdS5jb25zdGFudHMnO1xuaW1wb3J0IHsgR1BVU2V0dGluZ3MgfSBmcm9tICcuLi9jb25zdGFudHMvZ3B1LXNldHRpbmdzLmNvbnN0YW50cyc7XG5pbXBvcnQgeyBPcGNvZGVzIH0gZnJvbSAnLi9vcGNvZGVzJztcbmltcG9ydCB7IEF1ZGlvIH0gZnJvbSAnLi4vYXVkaW8vYXVkaW8nO1xuaW1wb3J0IHsgR1BVIH0gZnJvbSAnLi4vZ3B1L2dwdSc7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4uL2lucHV0L2lucHV0JztcbmltcG9ydCB7IE1NVSB9IGZyb20gJy4uL21tdS9tbXUnO1xuaW1wb3J0IHsgRGVidWcgfSBmcm9tICcuLi9kZWJ1Zyc7XG5jbGFzcyBDUFUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLklTX0lOVEVSUlVQVEVEID0gMHgwMTtcbiAgICAgICAgdGhpcy5WX0JMQU5LX0lOVEVSUlVQVCA9IDB4NDA7XG4gICAgICAgIHRoaXMuZGVidWcgPSBEZWJ1Zy5zaGFyZWQ7XG4gICAgICAgIHRoaXMuY2xvY2sgPSB7XG4gICAgICAgICAgICBNOiAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVnaXN0ZXIgPSB7XG4gICAgICAgICAgICBBOiAweDAxLCBCOiAweDAwLCBDOiAweDEzLCBEOiAweDAwLCBFOiAweEQ4LCBIOiAweDAxLCBMOiAweDRELCBGOiAweEIwLFxuICAgICAgICAgICAgUEM6IDB4MDEwMCwgU1A6IDB4RkZGRSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5JTUUgPSAwO1xuICAgICAgICB0aGlzLmhhbHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYWx0QnVnID0gZmFsc2U7XG4gICAgICAgIHRoaXMub3Bjb2RlcyA9IG5ldyBPcGNvZGVzKHRoaXMpO1xuICAgICAgICB0aGlzLm1tdSA9IE1NVS5zaGFyZWQ7XG4gICAgICAgIHRoaXMubW11LmNwdSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGVidWcubW11ID0gTU1VLnNoYXJlZDtcbiAgICAgICAgdGhpcy5kZWJ1Zy5kZWJ1Z2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmdwdSA9IEdQVS5zaGFyZWQ7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBuZXcgSW5wdXQoKTtcbiAgICAgICAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IHNoYXJlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaGFyZWQpXG4gICAgICAgICAgICB0aGlzLl9zaGFyZWQgPSBuZXcgQ1BVKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWQ7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgIH1cbiAgICBoYW5kbGVUaW1lcigpIHtcbiAgICB9XG4gICAgcmVhZDgocjEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJbcjFdICYgMHhGRjtcbiAgICB9XG4gICAgcmVhZDE2KHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IGhiID0gKHRoaXMucmVnaXN0ZXJbcjFoXSA8PCA4KSAmIDB4RkYwMDtcbiAgICAgICAgY29uc3QgbGIgPSB0aGlzLnJlZ2lzdGVyW3IxbF0gJiAweDAwRkY7XG4gICAgICAgIHJldHVybiAoaGIgfCBsYikgJiAweEZGRkY7XG4gICAgfVxuICAgIHdyaXRlOCh2YWx1ZSwgcjEpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcltyMV0gPSB2YWx1ZSAmIDB4RkY7XG4gICAgfVxuICAgIHdyaXRlMTYodmFsdWUsIHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IGhiID0gKCh2YWx1ZSAmIDB4RkYwMCkgPj4gOCkgJiAweEZGO1xuICAgICAgICBjb25zdCBsYiA9ICh2YWx1ZSAmIDB4MDBGRikgJiAweEZGO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyW3IxaF0gPSBoYjtcbiAgICAgICAgdGhpcy5yZWdpc3RlcltyMWxdID0gbGI7XG4gICAgfVxuICAgIGN5Y2xlKCkge1xuICAgICAgICBjb25zdCB7IE1BWF9GUFMsIENMT0NLX1NQRUVELCBNQVhfRlJBTUVfQ1lDTEVTIH0gPSBDUFVTZXR0aW5ncztcbiAgICAgICAgbGV0IGZyYW1lQ2xvY2sgPSAodGhpcy5jbG9jay5NIC8gNCkgKyBHUFVTZXR0aW5ncy5DWUNMRVNfUEVSX0ZSQU1FO1xuICAgICAgICBsZXQgY3ljbGVzID0gMDtcbiAgICAgICAgbGV0IG9wZXJhdGlvbkN5Y2xlcyA9IDA7XG4gICAgICAgIGxldCBuZXh0SXMxNmJpdCA9IGZhbHNlO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5JTUUgJiYgdGhpcy5tbXUuSUUgJiYgdGhpcy5tbXUuSUYpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tbXUuSUUgJiB0aGlzLm1tdS5JRiAmIHRoaXMuSVNfSU5URVJSVVBURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tbXUuSUYgJj0gMHhGRiAtIHRoaXMuSVNfSU5URVJSVVBURUQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SU1QodGhpcy5WX0JMQU5LX0lOVEVSUlVQVCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlci5QQyAmPSBNQVhfRlJBTUVfQ1lDTEVTO1xuICAgICAgICAgICAgY29uc3QgcGMgPSB0aGlzLnJlZ2lzdGVyLlBDO1xuICAgICAgICAgICAgbGV0IG9wY29kZSA9IHRoaXMubW11LnJlYWQobmV4dElzMTZiaXQgPyBwYyArIDEgOiBwYyk7XG4gICAgICAgICAgICBjeWNsZXMgPSB0aGlzLmNsb2NrLk07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLUJMQVJHRy0tLS0tLS0tLS0tLS0tLScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luc3RydWN0aW9uOicsIG9wY29kZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSwgbmV4dElzMTZiaXQgPyAnMTYgYml0JyA6ICc4IGJpdCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEE6ICR7dGhpcy5yZWdpc3Rlci5BLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfSwgRjogJHt0aGlzLnJlZ2lzdGVyLkYudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9LCBCOiAke3RoaXMucmVnaXN0ZXIuQi50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX0sIEM6ICR7dGhpcy5yZWdpc3Rlci5DLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfSwgRDogJHt0aGlzLnJlZ2lzdGVyLkQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9LCBFOiAke3RoaXMucmVnaXN0ZXIuRS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX0sIEg6ICR7dGhpcy5yZWdpc3Rlci5ILnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfSwgTDogJHt0aGlzLnJlZ2lzdGVyLkwudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9LCBTUDogJHt0aGlzLnJlZ2lzdGVyLlNQLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfSwgUEM6ICR7dGhpcy5yZWdpc3Rlci5QQy50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX0sICgke3RoaXMubW11LnJlYWQodGhpcy5yZWdpc3Rlci5QQykudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9ICR7dGhpcy5tbXUucmVhZCh0aGlzLnJlZ2lzdGVyLlBDICsgMSkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9ICR7dGhpcy5tbXUucmVhZCh0aGlzLnJlZ2lzdGVyLlBDICsgMikudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9ICR7dGhpcy5tbXUucmVhZCh0aGlzLnJlZ2lzdGVyLlBDICsgMykudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9KWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NZQ0xFUzonLCBjeWNsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BDOicsIHRoaXMucmVnaXN0ZXIuUEMpO1xuICAgICAgICAgICAgdGhpcy5leGVjdXRlSW5zdHJ1Y3Rpb24ob3Bjb2RlLCBuZXh0SXMxNmJpdCA/IDE2IDogOCk7XG4gICAgICAgICAgICBuZXh0SXMxNmJpdCA9IG9wY29kZSA9PSAweENCO1xuICAgICAgICAgICAgdGhpcy5kZWJ1Zy5yZWFkU2VyaWFsT3V0cHV0KCk7XG4gICAgICAgICAgICB0aGlzLmdwdS50aWNrKCk7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuY2xvY2suTSAvIDQgPCBmcmFtZUNsb2NrKTtcbiAgICB9XG4gICAgZXhlY3V0ZUluc3RydWN0aW9uKG9wY29kZSwgdHlwZSkge1xuICAgICAgICBmdW5jdGlvbiBleGVjdXRlOGJpdCgpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3Bjb2RlICYgMHhGRkZGKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBvcGNvZGUgJiAweEZGRkY6XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3Bjb2RlICYgMHhGRikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5OT1AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUlJfZDE2KCdCJywgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUlJfUignQicsICdDJywgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuSU5DX1JSKCdCJywgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuSU5DX1IoJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuREVDX1IoJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9kOCgnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5STENfUignQScsIDEsIDQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9hMTZfU1AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQUREX1JSX1JSKCdIJywgJ0wnLCAnQicsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MEE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUlIoJ0EnLCAnQicsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MEI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkRFQ19SUignQicsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MEM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLklOQ19SKCdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MEQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkRFQ19SKCdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MEU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfZDgoJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0EnLCAxLCA0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUlJfZDE2KCdEJywgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUlJfUignRCcsICdFJywgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuSU5DX1JSKCdEJywgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuSU5DX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuREVDX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9kOCgnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5STF9SKCdBJywgMSwgNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkpSKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFERF9SUl9SUignSCcsICdMJywgJ0QnLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDFBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9SX1JSKCdBJywgJ0QnLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDFCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5ERUNfUlIoJ0QnLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDFDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5JTkNfUignRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDFEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5ERUNfUignRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDFFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9SX2Q4KCdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MUY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJSX1IoJ0EnLCAxLCA0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuSlJfTkYoQ1BVRmxhZ1R5cGUuWik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MjE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX2QxNignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MjI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdBJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MjM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLklOQ19SUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MjQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLklOQ19SKCdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MjU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkRFQ19SKCdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MjY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfZDgoJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuREFBKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Mjg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkpSX0YoQ1BVRmxhZ1R5cGUuWik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Mjk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFERF9SUl9SUignSCcsICdMJywgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDJBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9SX1JSKCdBJywgJ0gnLCAnTCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDJCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5ERUNfUlIoJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDJDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5JTkNfUignTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDJEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5ERUNfUignTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDJFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9SX2Q4KCdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MkY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkNQTCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDMwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5KUl9ORihDUFVGbGFnVHlwZS5DKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgzMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfU1BfZDE2KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MzI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdBJywgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDMzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5JTkNfU1AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgzNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuSU5DX1JSX21lbSgnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MzU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkRFQ19SUl9tZW0oJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDM2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9SUl9ubignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Mzc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNDRigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDM4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5KUl9GKENQVUZsYWdUeXBlLkMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDM5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5BRERfUlJfU1AoJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDNBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9SX1JSKCdBJywgJ0gnLCAnTCcsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgzQjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuREVDX1NQKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4M0M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLklOQ19SKCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4M0Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkRFQ19SKCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4M0U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfZDgoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgzRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQ0NGKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQicsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQicsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQicsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQicsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQicsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQicsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUlIoJ0InLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQicsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQycsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQycsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQycsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQycsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQycsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQycsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0MnLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignQycsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRCcsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRCcsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRCcsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRCcsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRCcsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUlIoJ0QnLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRCcsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRScsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRScsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRScsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRScsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRScsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRScsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUlIoJ0UnLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignRScsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignSCcsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignSCcsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignSCcsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignSCcsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignSCcsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUlIoJ0gnLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Njc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignSCcsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Njg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignTCcsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Njk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignTCcsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignTCcsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignTCcsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignTCcsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignTCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUlIoJ0wnLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfUignTCcsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1IoJ0gnLCAnTCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkhBTFQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3NzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUlJfUignSCcsICdMJywgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3ODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SKCdBJywgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3OTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SKCdBJywgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3QTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SKCdBJywgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3QjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SKCdBJywgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3QzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SKCdBJywgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3RDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SKCdBJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3RTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SUignQScsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3RjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9SKCdBJywgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4MDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQUREX1JfUignQScsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4ODE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFERF9SX1IoJ0EnLCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDgyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5BRERfUl9SKCdBJywgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4MzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQUREX1JfUignQScsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4ODQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFERF9SX1IoJ0EnLCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDg1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5BRERfUl9SKCdBJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4NjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQUREX1JfUlIoJ0EnLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4ODc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFERF9SX1IoJ0EnLCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDg4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5BRENfUl9SKCdBJywgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4OTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQURDX1JfUignQScsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OEE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFEQ19SX1IoJ0EnLCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDhCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5BRENfUl9SKCdBJywgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4QzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQURDX1JfUignQScsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OEQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFEQ19SX1IoJ0EnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDhFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5BRENfUl9SUignQScsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4RjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQURDX1JfUignQScsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SKCdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SKCdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SKCdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SKCdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SKCdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SKCdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNVQl9SKCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNCQ19SX1IoJ0EnLCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDk5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TQkNfUl9SKCdBJywgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5QTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0JDX1JfUignQScsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNCQ19SX1IoJ0EnLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDlDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TQkNfUl9SKCdBJywgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5RDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0JDX1JfUignQScsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OUU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNCQ19SX1JSKCdBJywgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDlGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TQkNfUl9SKCdBJywgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1IoJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1IoJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1IoJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1IoJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1IoJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1JSKCdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQU5EX1IoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1IoJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1IoJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBQTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBQjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1IoJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1IoJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1IoJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1JSKCdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuWE9SX1IoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuT1JfUignQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEIxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5PUl9SKCdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QjI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLk9SX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuT1JfUignRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEI0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5PUl9SKCdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QjU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLk9SX1IoJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuT1JfUlIoJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEI3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5PUl9SKCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Qjg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkNQX1IoJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQ1BfUignQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEJBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5DUF9SKCdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QkI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkNQX1IoJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQ1BfUignSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEJEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5DUF9SKCdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QkU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkNQX1JSKCdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQ1BfUignQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEMwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVRfTkYoQ1BVRmxhZ1R5cGUuWik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QzE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlBPUF9SUignQicsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QzI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkpQX05GKENQVUZsYWdUeXBlLlopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEMzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5KUCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEM0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5DQUxMX05GKENQVUZsYWdUeXBlLlopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEM1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5QVVNIX1JSKCdCJywgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQUREX1JfZDgoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlNUKDB4MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEM4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVRfRihDUFVGbGFnVHlwZS5aKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVUKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Q0E6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkpQX0YoQ1BVRmxhZ1R5cGUuWik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Q0I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Q0M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkNBTExfRihDUFVGbGFnVHlwZS5aKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQ0FMTCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweENFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5BRENfUl9kOCgnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweENGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SU1QoMHgwOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFVF9ORihDUFVGbGFnVHlwZS5DKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhEMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUE9QX1JSKCdEJywgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhEMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuSlBfTkYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkNBTExfTkYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlBVU0hfUlIoJ0QnLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEQ2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TVUIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhENzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlNUKDB4MTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEQ4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVRfRihDUFVGbGFnVHlwZS5DKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhEOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVUSSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweERBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5KUF9GKENQVUZsYWdUeXBlLkMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweERCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweERDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5DQUxMX0YoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4REQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4REU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNCQ19SX2Q4KCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4REY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJTVCgweDE4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfYThfUignQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEUxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5QT1BfUlIoJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEUyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9DX1IoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUFVTSF9SUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFORCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEU3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SU1QoMHgyMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RTg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkFERF9TUF9kOCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEU5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5KUF9SUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RUE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX2ExNl9SKCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RUI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RUM6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RUU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlhPUigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEVGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SU1QoMHgyOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RjA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfYTgoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUE9QX1JSKCdBJywgJ0YnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuTERfUl9DKCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RjM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkRJKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RjQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RjU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlBVU0hfUlIoJ0EnLCAnRicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEY2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5PUigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEY3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SU1QoMHgzMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Rjg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JSX1NQZDgoJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEY5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5MRF9TUF9SUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkxEX1JfYTE2KCdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkVJKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkM6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkNQKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJTVCgweDM4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDB4MTAwMDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNUT1AoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuaW1wbGVtZW50ZWQgb3Bjb2RlICg4LWJpdCk6Jywgb3Bjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBleGVjdXRlMTZiaXQoKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wY29kZSAmIDB4Q0JGRikge1xuICAgICAgICAgICAgICAgIGNhc2Ugb3Bjb2RlICYgMHhDQkZGOlxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wY29kZSAmIDB4RkYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1IoJ0InLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1IoJ0MnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1IoJ0QnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1IoJ0UnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1IoJ0gnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1IoJ0wnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1JSKCdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxDX1IoJ0EnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0InLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0MnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwQTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0QnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwQjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0UnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0gnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0wnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1JSKCdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgwRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJDX1IoJ0EnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxfUignQicsIDIsIDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5STF9SKCdDJywgMiwgOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJMX1IoJ0QnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxfUignRScsIDIsIDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5STF9SKCdIJywgMiwgOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJMX1IoJ0wnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkxfUlIoJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDE4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5STF9SKCdBJywgMiwgOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MTk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJSX1IoJ0InLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxQTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJfUignRCcsIDIsIDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDFCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SUl9SKCdFJywgMiwgOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MUM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJSX1IoJ0gnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgxRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUlJfUignTCcsIDIsIDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDFFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SUl9SUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MUY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJSX1IoJ0EnLCAyLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1IoJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1IoJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1IoJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1IoJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1IoJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1JSKCdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0xBX1IoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1IoJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1IoJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyQTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyQjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1IoJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1IoJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1IoJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1JSKCdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgyRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1JBX1IoJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgzMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1dBUF9SKCdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MzE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNXQVBfUignQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDMyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TV0FQX1IoJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgzMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1dBUF9SKCdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4MzQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNXQVBfUignSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDM1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TV0FQX1IoJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHgzNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU1dBUF9SUignSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Mzc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNXQVBfUignQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDM4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUignQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDM5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUignQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDNBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUignRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDNCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUignRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDNDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUignSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDNEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUignTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUlIoJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDNGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TUkxfUignQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDQwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDEsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwMSwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg0MjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDAxLCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDQzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDEsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwMSwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg0NTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDAxLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDQ2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SUigweDAxLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwMSwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg0ODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDAyLCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDQ5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDIsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwMiwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg0QjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDAyLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDRDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDIsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NEQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwMiwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg0RTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUlIoMHgwMiwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDRGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDIsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwNCwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg1MTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDA0LCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDUyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDQsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwNCwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg1NDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDA0LCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDU1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDQsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1JSKDB4MDQsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg1NzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDA0LCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDU4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDgsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NTk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwOCwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg1QTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDA4LCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDVCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MDgsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwOCwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg1RDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDA4LCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDVFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SUigweDA4LCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NUY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgwOCwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg2MDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDEwLCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDYxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MTAsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgxMCwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg2MzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDEwLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDY0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MTAsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NjU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgxMCwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg2NjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUlIoMHgxMCwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDY3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MTAsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Njg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgyMCwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg2OTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDIwLCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDZBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MjAsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHgyMCwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg2QzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDIwLCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDZEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4MjAsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NkU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1JSKDB4MjAsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg2RjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDIwLCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDcwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4NDAsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHg0MCwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3MjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDQwLCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDczOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4NDAsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4NzQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHg0MCwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3NTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDQwLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDc2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SUigweDQwLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Nzc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHg0MCwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3ODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDgwLCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDc5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4ODAsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4N0E6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHg4MCwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3QjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUigweDgwLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDdDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4ODAsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4N0Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLkJJVF9iX1IoMHg4MCwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg3RTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuQklUX2JfUlIoMHg4MCwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDdGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5CSVRfYl9SKDB4ODAsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4ODA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwMSwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4MTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDAxLCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDgyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDEsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4ODM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwMSwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4NDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDAxLCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDg1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDEsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4ODY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1JSKDB4MDEsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4NzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDAxLCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDg4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDIsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4ODk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwMiwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4QTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDAyLCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDhCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDIsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OEM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwMiwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg4RDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDAyLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDhFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SUigweDAyLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OEY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwMiwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5MDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDA0LCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDkxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDQsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwNCwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5MzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDA0LCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDk0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDQsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwNCwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5NjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUlIoMHgwNCwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDk3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDQsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OTg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwOCwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5OTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDA4LCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDlBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDgsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgwOCwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5QzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDA4LCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweDlEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MDgsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4OUU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1JSKDB4MDgsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHg5RjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDA4LCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MTAsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QTE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgxMCwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDEwLCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEEzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MTAsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgxMCwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDEwLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEE2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SUigweDEwLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QTc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgxMCwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDIwLCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEE5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MjAsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QUE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgyMCwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBQjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDIwLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEFDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MjAsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHgyMCwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhBRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUlIoMHgyMCwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEFGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4MjAsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QjA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHg0MCwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDQwLCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEIyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4NDAsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QjM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHg0MCwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDQwLCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEI1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4NDAsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QjY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1JSKDB4NDAsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDQwLCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEI4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4ODAsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Qjk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHg4MCwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCQTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDgwLCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEJCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SKDB4ODAsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QkM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHg4MCwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhCRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuUkVTX2JfUigweDgwLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEJFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5SRVNfYl9SUigweDgwLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QkY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlJFU19iX1IoMHg4MCwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDAxLCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEMxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDEsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QzI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwMSwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDAxLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEM0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDEsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4QzU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwMSwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUlIoMHgwMSwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEM3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDEsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Qzg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwMiwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDAyLCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweENBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDIsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Q0I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwMiwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDAyLCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweENEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDIsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Q0U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1JSKDB4MDIsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhDRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDAyLCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEQwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDQsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwNCwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhEMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDA0LCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEQzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDQsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwNCwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhENTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDA0LCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEQ2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SUigweDA0LCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwNCwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhEODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDA4LCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEQ5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDgsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4REE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwOCwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhEQjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDA4LCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweERDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDgsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4REQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgwOCwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhERTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUlIoMHgwOCwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweERGOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MDgsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgxMCwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDEwLCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEUyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MTAsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RTM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgxMCwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDEwLCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEU1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MTAsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1JSKDB4MTAsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDEwLCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEU4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MjAsICdCJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RTk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgyMCwgJ0MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFQTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDIwLCAnRCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEVCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4MjAsICdFJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RUM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgyMCwgJ0gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhFRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDIwLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEVFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SUigweDIwLCAnSCcsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RUY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHgyMCwgJ0EnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDQwLCAnQicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEYxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4NDAsICdDJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RjI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHg0MCwgJ0QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDQwLCAnRScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEY0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4NDAsICdIJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RjU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHg0MCwgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUlIoMHg0MCwgJ0gnLCAnTCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEY3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4NDAsICdBJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4Rjg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHg4MCwgJ0InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDgwLCAnQycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEZBOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4ODAsICdEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1IoMHg4MCwgJ0UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDgwLCAnSCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAweEZEOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Bjb2Rlcy5TRVRfYl9SKDB4ODAsICdMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDB4RkU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGNvZGVzLlNFVF9iX1JSKDB4ODAsICdIJywgJ0wnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMHhGRjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wY29kZXMuU0VUX2JfUigweDgwLCAnQScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuaW1wbGVtZW50ZWQgb3Bjb2RlICgxNi1iaXQpOicsIG9wY29kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09IDgpIHtcbiAgICAgICAgICAgIGV4ZWN1dGU4Yml0LmJpbmQodGhpcykoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV4ZWN1dGUxNmJpdC5iaW5kKHRoaXMpKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBDUFUgfTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY2xvY2subW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9yZWdpc3Rlci5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL2ZsYWcubW9kZWwnO1xuIiwidmFyIENQVUZsYWc7XG4oZnVuY3Rpb24gKENQVUZsYWcpIHtcbiAgICBDUFVGbGFnW0NQVUZsYWdbXCJaXCJdID0gMTI4XSA9IFwiWlwiO1xuICAgIENQVUZsYWdbQ1BVRmxhZ1tcIk5cIl0gPSA2NF0gPSBcIk5cIjtcbiAgICBDUFVGbGFnW0NQVUZsYWdbXCJIXCJdID0gMzJdID0gXCJIXCI7XG4gICAgQ1BVRmxhZ1tDUFVGbGFnW1wiQ1wiXSA9IDE2XSA9IFwiQ1wiO1xufSkoQ1BVRmxhZyB8fCAoQ1BVRmxhZyA9IHt9KSk7XG52YXIgQ1BVRmxhZ1R5cGU7XG4oZnVuY3Rpb24gKENQVUZsYWdUeXBlKSB7XG4gICAgQ1BVRmxhZ1R5cGVbXCJaXCJdID0gXCJaXCI7XG4gICAgQ1BVRmxhZ1R5cGVbXCJOXCJdID0gXCJOXCI7XG4gICAgQ1BVRmxhZ1R5cGVbXCJIXCJdID0gXCJIXCI7XG4gICAgQ1BVRmxhZ1R5cGVbXCJDXCJdID0gXCJDXCI7XG59KShDUFVGbGFnVHlwZSB8fCAoQ1BVRmxhZ1R5cGUgPSB7fSkpO1xuZXhwb3J0IHsgQ1BVRmxhZywgQ1BVRmxhZ1R5cGUgfTtcbiIsImNvbnN0IENQVVNldHRpbmdzID0ge1xuICAgIENMT0NLX1NQRUVEOiA0MTk0MzA0LFxuICAgIE1BWF9GUFM6IDYwLFxuICAgIE1BWF9GUkFNRV9DWUNMRVM6IDY1NTM1XG59O1xuZXhwb3J0IHsgQ1BVU2V0dGluZ3MgfTtcbiIsImNvbnN0IEdQVVNldHRpbmdzID0ge1xuICAgIFdJRFRIOiAxNjAsXG4gICAgSEVJR0hUOiAxNDQsXG4gICAgU0NBTEU6IDEsXG4gICAgQkFDS0dST1VORF9DT0xPUjogJyMwMDAwMDAnLFxuICAgIENZQ0xFU19QRVJfRlJBTUU6IDcwMjI0XG59O1xuZXhwb3J0IHsgR1BVU2V0dGluZ3MgfTtcbiIsImltcG9ydCB7IE1NVSB9IGZyb20gJy4uL21tdS9tbXUnO1xuaW1wb3J0IHsgQ1BVRmxhZywgQ1BVRmxhZ1R5cGUgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWxzJztcbmNsYXNzIE9wY29kZXMge1xuICAgIGNvbnN0cnVjdG9yKGNwdSkge1xuICAgICAgICBjb25zdCB7IHJlZ2lzdGVyLCBjbG9jayB9ID0gY3B1O1xuICAgICAgICB0aGlzLm1tdSA9IE1NVS5zaGFyZWQ7XG4gICAgICAgIHRoaXMuY3B1ID0gY3B1O1xuICAgICAgICB0aGlzLnIgPSByZWdpc3RlcjtcbiAgICAgICAgdGhpcy5jID0gY2xvY2s7XG4gICAgfVxuICAgICRpbmNQQyhuciA9IDEpIHtcbiAgICAgICAgdGhpcy5jcHUucmVnaXN0ZXIuUEMgKz0gbnI7XG4gICAgfVxuICAgICRpbmNDbG9jayhuciA9IDQpIHtcbiAgICAgICAgdGhpcy5jcHUuY2xvY2suTSArPSBucjtcbiAgICB9XG4gICAgJGdldEYoZmxhZykge1xuICAgICAgICByZXR1cm4gISEodGhpcy5yLkYgJiBDUFVGbGFnW2ZsYWddKTtcbiAgICB9XG4gICAgJHNldEYoZmxhZywgdikge1xuICAgICAgICB0aGlzLnIuRiA9IHYgPyB0aGlzLnIuRiB8IENQVUZsYWdbZmxhZ10gOiB0aGlzLnIuRiAmIH5DUFVGbGFnW2ZsYWddO1xuICAgIH1cbiAgICAkcmVzZXRGKGZsYWcpIHtcbiAgICAgICAgdGhpcy5yLkYgJj0gfkNQVUZsYWdbZmxhZ107XG4gICAgfVxuICAgICR0b2dnbGVGKGZsYWcpIHtcbiAgICAgICAgdGhpcy5yLkYgXj0gQ1BVRmxhZ1tmbGFnXTtcbiAgICB9XG4gICAgJGlzSGFsZkNhcnJ5KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuICgoKGEgJiAweEYpICsgKGIgJiAweEYpKSAmIDB4MTApID09IDB4MTA7XG4gICAgfVxuICAgICRpc0NhcnJ5KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuICgoKGEgJiAweEZGKSArIChiICYgMHhGRikpICYgMHg3MCkgPT0gMHg3MDtcbiAgICB9XG4gICAgJGlzQml0MTVDYXJyeShhLCBiKSB7XG4gICAgICAgIHJldHVybiAoKGEgJiAweEZGRkYpICsgKGIgJiAweEZGRkYpKSA+IDB4N0ZGRjtcbiAgICB9XG4gICAgJGlzQml0MTFDYXJyeShhLCBiKSB7XG4gICAgICAgIHJldHVybiAoKChhICYgMHhGRkZGKSArIChiICYgMHhGRkZGKSkgJiAweDBGRkYpID09PSAweDBGRkY7XG4gICAgfVxuICAgICRpc0JpdDNCb3Jyb3coYSwgYikge1xuICAgICAgICByZXR1cm4gdGhpcy4kaXNIYWxmQ2FycnkoYSwgLWIpO1xuICAgIH1cbiAgICAkaXNCaXQ0Qm9ycm93KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGlzQ2FycnkoYSwgLWIpO1xuICAgIH1cbiAgICBJTkNfUlIocjEsIHIyKSB7XG4gICAgICAgIGNvbnN0IHIzID0gdGhpcy5jcHUucmVhZDE2KHIxLCByMik7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlMTYocjMgKyAxLCByMSwgcjIpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIElOQ19SUl9tZW0ocjEsIHIyKSB7XG4gICAgICAgIGxldCB2ID0gdGhpcy5jcHUucmVhZDE2KHIxLCByMikgKyAxO1xuICAgICAgICBsZXQgbmV3ViA9IHYgKyAxO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICFuZXdWKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICh0aGlzLiRpc0hhbGZDYXJyeSh2LCAxKSkpO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTE2KHYsIHIxLCByMik7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDEyKTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIElOQ19TUCgpIHtcbiAgICAgICAgdGhpcy5yLlNQKys7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgTERfUlJfZDE2KHIxaCwgcjFsKSB7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlMTYodGhpcy5tbXUuZ2V0SW1tZWRpYXRlMTYodGhpcy5yLlBDICsgMSksIHIxaCwgcjFsKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOSk7XG4gICAgICAgIHRoaXMuJGluY1BDKDMpO1xuICAgIH1cbiAgICBMRF9SUl9TUGQ4KHIxaCwgcjFsKSB7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlMTYodGhpcy5yLlNQICsgVXRpbHMuZ2V0U2lnbmVkVmFsdWU4KHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKSksIHIxaCwgcjFsKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTIpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgTERfU1BfZDE2KCkge1xuICAgICAgICB0aGlzLnIuU1AgPSB0aGlzLm1tdS5nZXRJbW1lZGlhdGUxNih0aGlzLnIuUEMpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg5KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIExEX1NQX1JSKHIxaCwgcjFsKSB7XG4gICAgICAgIHRoaXMuci5TUCA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLmNwdS5yZWdpc3Rlci5TUCArPSAxO1xuICAgIH1cbiAgICBMRF9SUl9ubihyMSwgcjIpIHtcbiAgICAgICAgdGhpcy5jcHUud3JpdGUxNih0aGlzLm1tdS5nZXRJbW1lZGlhdGU4KHRoaXMuci5QQyksIHIxLCByMik7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDEyKTtcbiAgICAgICAgdGhpcy5jcHUucmVnaXN0ZXIuU1AgKz0gMTtcbiAgICB9XG4gICAgTERfUlJfUihyMWgsIHIxbCwgcjIsIGluY3JlbWVudCwgZGVjcmVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjFoLCByMWwpO1xuICAgICAgICBsZXQgdiA9IHRoaXMuY3B1LnJlYWQ4KHIyKTtcbiAgICAgICAgaWYgKGluY3JlbWVudClcbiAgICAgICAgICAgIHYrKztcbiAgICAgICAgaWYgKGRlY3JlbWVudClcbiAgICAgICAgICAgIHYtLTtcbiAgICAgICAgdGhpcy5tbXUud3JpdGUocG9pbnRlciwgdik7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgTERfUl9SUihyMSwgcjJoLCByMmwsIGluY3JlbWVudCwgZGVjcmVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjJoLCByMmwpO1xuICAgICAgICBsZXQgdiA9IHRoaXMubW11LnJlYWQocG9pbnRlcik7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCByMSk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlMTYoaW5jcmVtZW50ID8gcG9pbnRlciArIDEgOiBkZWNyZW1lbnQgPyBwb2ludGVyIC0gMSA6IHBvaW50ZXIsIHIyaCwgcjJsKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBMRF9SX1IocjEsIHIyKSB7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh0aGlzLmNwdS5yZWFkOChyMiksIHIxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soNCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBMRF9hMTZfUihyMSkge1xuICAgICAgICB0aGlzLm1tdS53cml0ZSgweEZGMDAgKyB0aGlzLm1tdS5nZXRJbW1lZGlhdGUxNih0aGlzLnIuUEMpLCB0aGlzLmNwdS5yZWFkOChyMSkpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygxNik7XG4gICAgICAgIHRoaXMuJGluY1BDKDMpO1xuICAgIH1cbiAgICBMRF9SX2ExNihyMSkge1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodGhpcy5tbXUucmVhZCgweEZGMDAgKyB0aGlzLm1tdS5nZXRJbW1lZGlhdGUxNih0aGlzLnIuUEMpKSwgcjEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygxNik7XG4gICAgICAgIHRoaXMuJGluY1BDKDMpO1xuICAgIH1cbiAgICBMRF9hMTZfU1AoKSB7XG4gICAgICAgIGNvbnN0IHNwSGIgPSAodGhpcy5jcHUucmVnaXN0ZXIuU1AgPj4gOCkgJiAweEZGO1xuICAgICAgICBjb25zdCBzcExiID0gdGhpcy5jcHUucmVnaXN0ZXIuU1AgJiAweEZGO1xuICAgICAgICB0aGlzLm1tdS53cml0ZSh0aGlzLm1tdS5nZXRJbW1lZGlhdGUxNih0aGlzLnIuUEMpLCBzcExiKTtcbiAgICAgICAgdGhpcy5tbXUud3JpdGUodGhpcy5tbXUuZ2V0SW1tZWRpYXRlMTYodGhpcy5yLlBDKSArIDEsIHNwSGIpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygyMCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDMpO1xuICAgIH1cbiAgICBMRF9hOF9SKHIxKSB7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNwdS5yZWFkOChyMSk7XG4gICAgICAgIHRoaXMubW11LndyaXRlKDB4RkYwMCArIHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKSwgdik7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDEyKTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIExEX1JfYTgocjEpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMubW11LnJlYWQoMHhGRjAwICsgdGhpcy5tbXUuZ2V0SW1tZWRpYXRlOCh0aGlzLnIuUEMpKTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTIpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgTERfQ19SKHIxKSB7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNwdS5yZWFkOChyMSk7XG4gICAgICAgIHRoaXMubW11LndyaXRlKDB4RkYwMCArIHRoaXMubW11LnJlYWQodGhpcy5jcHUucmVhZDgoJ0MnKSksIHYpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIExEX1JfQyhyMSkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5tbXUucmVhZCgweEZGMDAgKyB0aGlzLm1tdS5yZWFkKHRoaXMuY3B1LnJlYWQ4KCdDJykpKTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBSTF9SKHIxLCBieXRlcywgY3ljbGVzKSB7XG4gICAgICAgIGNvbnN0IGxlZnRCaXQ3ID0gdGhpcy5jcHUucmVhZDgocjEpICYgMHg4MDtcbiAgICAgICAgY29uc3QgdiA9ICh0aGlzLmNwdS5yZWFkOChyMSkgPDwgMSkgfCAoKHRoaXMuci5GICYgQ1BVRmxhZy5DKSA+PiA0KTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsIGxlZnRCaXQ3ICYgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKGN5Y2xlcyk7XG4gICAgICAgIHRoaXMuJGluY1BDKGJ5dGVzKTtcbiAgICB9XG4gICAgUkxfUlIocjFoLCByMWwpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCk7XG4gICAgICAgIGNvbnN0IGxlZnRCaXQ3ID0gdGhpcy5tbXUucmVhZChwb2ludGVyKSAmIDB4ODA7XG4gICAgICAgIGNvbnN0IHYgPSAodGhpcy5tbXUucmVhZChwb2ludGVyKSA8PCAxKSB8ICgodGhpcy5yLkYgJiBDUFVGbGFnLkMpID4+IDQpO1xuICAgICAgICB0aGlzLm1tdS53cml0ZShwb2ludGVyLCB2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsIGxlZnRCaXQ3ICYgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgUlJDX1IocjEsIGJ5dGVzLCBjeWNsZXMpIHtcbiAgICAgICAgY29uc3QgcmlnaHRCaXQwID0gdGhpcy5jcHUucmVhZDgocjEpICYgMHgxO1xuICAgICAgICBjb25zdCB2ID0gKHRoaXMuY3B1LnJlYWQ4KHIxKSA+PiAxKSB8IChyaWdodEJpdDAgPDwgNyk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCByMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5IKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCByaWdodEJpdDAgJiAxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soY3ljbGVzKTtcbiAgICAgICAgdGhpcy4kaW5jUEMoYnl0ZXMpO1xuICAgIH1cbiAgICBSUkNfUlIocjFoLCByMWwpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0Qml0MCA9IHRoaXMubW11LnJlYWQocG9pbnRlcikgJiAweDE7XG4gICAgICAgIGNvbnN0IHYgPSAodGhpcy5tbXUucmVhZChwb2ludGVyKSA+PiAxKSB8IChyaWdodEJpdDAgPDwgNyk7XG4gICAgICAgIHRoaXMubW11LndyaXRlKHYsIHBvaW50ZXIpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgcmlnaHRCaXQwICYgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgUlJfUihyMSwgYnl0ZXMsIGN5Y2xlcykge1xuICAgICAgICBjb25zdCByaWdodEJpdDAgPSB0aGlzLmNwdS5yZWFkOChyMSkgJiAweDE7XG4gICAgICAgIGNvbnN0IHYgPSAodGhpcy5jcHUucmVhZDgocjEpID4+IDEpIHwgKHJpZ2h0Qml0MCA8PCA3KTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsIHJpZ2h0Qml0MCAmIDEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayhjeWNsZXMpO1xuICAgICAgICB0aGlzLiRpbmNQQyhieXRlcyk7XG4gICAgfVxuICAgIFJSX1JSKHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjFoLCByMWwpO1xuICAgICAgICBjb25zdCByaWdodEJpdDAgPSB0aGlzLm1tdS5yZWFkKHBvaW50ZXIpICYgMHgxO1xuICAgICAgICBjb25zdCB2ID0gKHRoaXMubW11LnJlYWQocG9pbnRlcikgPj4gMSkgfCAocmlnaHRCaXQwIDw8IDcpO1xuICAgICAgICB0aGlzLm1tdS53cml0ZShwb2ludGVyLCB2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsIHJpZ2h0Qml0MCAmIDEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygxNik7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBSTENfUihyMSwgYnl0ZXMsIGN5Y2xlcykge1xuICAgICAgICBjb25zdCBsZWZ0Qml0NyA9IHRoaXMuY3B1LnJlYWQ4KHIxKSAmIDB4ODA7XG4gICAgICAgIGNvbnN0IHYgPSAodGhpcy5jcHUucmVhZDgocjEpIDw8IDEpIHwgKGxlZnRCaXQ3ID4+IDcpO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodiwgcjEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgbGVmdEJpdDcgJiAxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soY3ljbGVzKTtcbiAgICAgICAgdGhpcy4kaW5jUEMoYnl0ZXMpO1xuICAgIH1cbiAgICBSTENfUlIocjFoLCByMWwpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCk7XG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSB0aGlzLm1tdS5yZWFkKHBvaW50ZXIpO1xuICAgICAgICBjb25zdCBsZWZ0Qml0NyA9IGFkZHJlc3MgJiAweDgwO1xuICAgICAgICBjb25zdCB2ID0gKGFkZHJlc3MgPDwgMSkgfCAobGVmdEJpdDcgPj4gNyk7XG4gICAgICAgIHRoaXMubW11LndyaXRlKHBvaW50ZXIsIHYpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgbGVmdEJpdDcgJiAxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTYpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgQURDX1JfZDgocjEpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQ4KHIxKTtcbiAgICAgICAgY29uc3QgdiA9ICgodGhpcy4kZ2V0RihDUFVGbGFnVHlwZS5DKSA/IDEgOiAwKSArIHRoaXMubW11LnJlYWQocG9pbnRlcikpICYgMHhGRjtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAodGhpcy4kaXNIYWxmQ2FycnkodGhpcy5jcHUucmVhZDgocjEpLCB2KSkpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsICh0aGlzLiRpc0NhcnJ5KHRoaXMuY3B1LnJlYWQ4KHIxKSwgdikpKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBBRENfUl9SKHIxLCByMikge1xuICAgICAgICBjb25zdCB2ID0gKCh0aGlzLiRnZXRGKENQVUZsYWdUeXBlLkMpID8gMSA6IDApICsgdGhpcy5jcHUucmVhZDgocjIpKSAmIDB4RkY7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCByMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgKHRoaXMuJGlzSGFsZkNhcnJ5KHRoaXMuY3B1LnJlYWQ4KHIxKSwgdikpKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCAodGhpcy4kaXNDYXJyeSh0aGlzLmNwdS5yZWFkOChyMSksIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgQURDX1JfUlIocjEsIHIyaCwgcjJsKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjJoLCByMmwpO1xuICAgICAgICBjb25zdCB2ID0gKCh0aGlzLiRnZXRGKENQVUZsYWdUeXBlLkMpID8gMSA6IDApICsgdGhpcy5tbXUucmVhZChwb2ludGVyKSkgJiAweEZGO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodiwgcjEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICh0aGlzLiRpc0hhbGZDYXJyeSh0aGlzLmNwdS5yZWFkOChyMSksIHYpKSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgKHRoaXMuJGlzQ2FycnkodGhpcy5jcHUucmVhZDgocjEpLCB2KSkpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIEFERF9SX2Q4KHIxKSB7XG4gICAgICAgIGNvbnN0IHYgPSAodGhpcy5jcHUucmVhZDgocjEpICsgdGhpcy5tbXUuZ2V0SW1tZWRpYXRlOCh0aGlzLnIuUEMpKSAmIDB4RkY7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCByMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgKHRoaXMuJGlzSGFsZkNhcnJ5KHRoaXMuY3B1LnJlYWQ4KHIxKSwgdikpKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCAodGhpcy4kaXNDYXJyeSh0aGlzLmNwdS5yZWFkOChyMSksIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgQUREX1NQX2Q4KCkge1xuICAgICAgICBjb25zdCB2ID0gKFV0aWxzLmdldFNpZ25lZFZhbHVlOCh0aGlzLm1tdS5nZXRJbW1lZGlhdGU4KHRoaXMuci5QQykpICsgdGhpcy5yLlNQKSAmIDB4RkY7XG4gICAgICAgIHRoaXMuci5TUCA9IHY7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5aKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICh0aGlzLiRpc0hhbGZDYXJyeSh0aGlzLnIuU1AsIHYpKSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgKHRoaXMuJGlzQ2FycnkodGhpcy5yLlNQLCB2KSkpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygxNik7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBBRERfUl9SKHIxLCByMikge1xuICAgICAgICBjb25zdCB2ID0gKHRoaXMuY3B1LnJlYWQ4KHIxKSArIHRoaXMuY3B1LnJlYWQ4KHIyKSkgJiAweEZGO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodiwgcjEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICh0aGlzLiRpc0hhbGZDYXJyeSh0aGlzLmNwdS5yZWFkOChyMSksIHYpKSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgKHRoaXMuJGlzQ2FycnkodGhpcy5jcHUucmVhZDgocjEpLCB2KSkpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIEFERF9SX1JSKHIxLCByMmgsIHIybCkge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jcHUucmVhZDE2KHIyaCwgcjJsKTtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMubW11LnJlYWQocG9pbnRlcikgKyB0aGlzLmNwdS5yZWFkOChyMSk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCByMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgKHRoaXMuJGlzSGFsZkNhcnJ5KHRoaXMuY3B1LnJlYWQ4KHIxKSwgdikpKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCAodGhpcy4kaXNDYXJyeSh0aGlzLmNwdS5yZWFkOChyMSksIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgQUREX1JSX1JSKHIxaCwgcjFsLCByMmgsIHIybCkge1xuICAgICAgICBjb25zdCByMSA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCkgJiAweEZGRkY7XG4gICAgICAgIGNvbnN0IHIyID0gdGhpcy5jcHUucmVhZDE2KHIyaCwgcjJsKSAmIDB4RkZGRjtcbiAgICAgICAgY29uc3QgdiA9IChyMSArIHIyKSAmIDB4RkZGRjtcbiAgICAgICAgdGhpcy5jcHUud3JpdGUxNih2LCByMWgsIHIxbCk7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAodGhpcy4kaXNCaXQxMUNhcnJ5KHIxLCB2KSkpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsICh0aGlzLiRpc0JpdDE1Q2FycnkocjEsIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgQUREX1JSX1NQKHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IHIxID0gdGhpcy5jcHUucmVhZDE2KHIxaCwgcjFsKSAmIDB4RkZGRjtcbiAgICAgICAgY29uc3QgdiA9ICh0aGlzLnIuU1AgKyByMSkgJiAweEZGRkY7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlMTYodiwgcjFoLCByMWwpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgKHRoaXMuJGlzQml0MTFDYXJyeShyMSwgdikpKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCAodGhpcy4kaXNCaXQxNUNhcnJ5KHIxLCB2KSkpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIEFORCgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKSAmIHRoaXMuY3B1LnJlYWQ4KCdBJyk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsIDEpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgQU5EX1IocjEpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY3B1LnJlYWQ4KHIxKSAmIHRoaXMuY3B1LnJlYWQ4KCdBJyk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsIDEpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgQU5EX1JSKHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjFoLCByMWwpO1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5tbXUucmVhZChwb2ludGVyKSAmIHRoaXMuY3B1LnJlYWQ4KCdBJyk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsIDEpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgQklUX2JfUihiaXQsIHIxKSB7XG4gICAgICAgIGNvbnN0IHJCaXQgPSB0aGlzLmNwdS5yZWFkOChyMSkgJiBiaXQ7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXJCaXQpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgQklUX2JfUlIoYml0LCByMWgsIHIxbCkge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jcHUucmVhZDE2KHIxaCwgcjFsKTtcbiAgICAgICAgY29uc3QgckJpdCA9IHRoaXMubW11LnJlYWQocG9pbnRlcikgJiBiaXQ7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXJCaXQpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDE2KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIENBTExfRihmbGFnKSB7XG4gICAgICAgIGlmICh0aGlzLiRnZXRGKGZsYWcpKSB7XG4gICAgICAgICAgICB0aGlzLnIuU1AgLT0gMjtcbiAgICAgICAgICAgIHRoaXMubW11LndyaXRlKHRoaXMuci5TUCwgdGhpcy5yLlBDICsgMik7XG4gICAgICAgICAgICB0aGlzLnIuUEMgPSB0aGlzLm1tdS5nZXRJbW1lZGlhdGU4KHRoaXMuci5QQyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRpbmNDbG9jaygxMik7XG4gICAgfVxuICAgIENBTEwoKSB7XG4gICAgICAgIHRoaXMuci5TUCAtPSAyO1xuICAgICAgICB0aGlzLm1tdS53cml0ZSh0aGlzLnIuU1AsIHRoaXMuci5QQyArIDIpO1xuICAgICAgICB0aGlzLnIuUEMgPSB0aGlzLm1tdS5nZXRJbW1lZGlhdGUxNih0aGlzLnIuUEMpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygyNCk7XG4gICAgfVxuICAgIENBTExfTkYoZmxhZykge1xuICAgICAgICBpZiAoIXRoaXMuJGdldEYoZmxhZykpIHtcbiAgICAgICAgICAgIHRoaXMuci5TUCAtPSAyO1xuICAgICAgICAgICAgdGhpcy5tbXUud3JpdGUodGhpcy5yLlNQLCB0aGlzLnIuUEMgKyAyKTtcbiAgICAgICAgICAgIHRoaXMuci5QQyA9IHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDEyKTtcbiAgICB9XG4gICAgREVDX1IocjEpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY3B1LnJlYWQ4KHIxKTtcbiAgICAgICAgY29uc3QgbmV3ViA9ICh2IC0gMSkgJiAweEZGO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICFuZXdWKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5OLCAxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAoIXRoaXMuJGlzQml0NEJvcnJvdyh2LCAxKSkpO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgobmV3ViwgcjEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIERFQ19SUihyMSwgcjIpIHtcbiAgICAgICAgY29uc3QgdiA9ICh0aGlzLmNwdS5yZWFkMTYocjEsIHIyKSAtIDEpICYgMHhGRkZGO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTE2KHYsIHIxLCByMik7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgREVDX1NQKCkge1xuICAgICAgICB0aGlzLnIuU1AgLT0gMTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soNCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBERUNfUlJfbWVtKHIxLCByMikge1xuICAgICAgICBsZXQgdiA9IHRoaXMuY3B1LnJlYWQxNihyMSwgcjIpICYgMHhGRkZGO1xuICAgICAgICBsZXQgbmV3ViA9ICh2IC0gMSkgJiAweEZGRkY7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIW5ld1YpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLk4sIDEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICghdGhpcy4kaXNCaXQ0Qm9ycm93KHYsIDEpKSk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlMTYobmV3ViwgcjEsIHIyKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTIpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgREkoKSB7XG4gICAgICAgIHRoaXMuY3B1LklNRSA9IDA7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgRUkoKSB7XG4gICAgICAgIHRoaXMuY3B1LklNRSA9IDE7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgSU5DX1IocjEpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY3B1LnJlYWQ4KHIxKTtcbiAgICAgICAgY29uc3QgbmV3ViA9ICh2ICsgMSkgJiAweEZGO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICFuZXdWKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICh0aGlzLiRpc0hhbGZDYXJyeSh2LCAxKSkpO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgobmV3ViwgcjEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIExEX1JfZDgocjEpIHtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDICsgMSksIHIxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBKUigpIHtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTIpO1xuICAgICAgICBjb25zdCBzOCA9IFV0aWxzLmdldFNpZ25lZFZhbHVlOCh0aGlzLm1tdS5nZXRJbW1lZGlhdGU4KHRoaXMuci5QQykpO1xuICAgICAgICB0aGlzLiRpbmNQQyhzOCk7XG4gICAgfVxuICAgIEpSX05GKGZsYWcpIHtcbiAgICAgICAgaWYgKHRoaXMuJGdldEYoZmxhZykpIHtcbiAgICAgICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzOCA9IFV0aWxzLmdldFNpZ25lZFZhbHVlOCh0aGlzLm1tdS5nZXRJbW1lZGlhdGU4KHRoaXMuci5QQyArIDEpKTtcbiAgICAgICAgICAgIHRoaXMuJGluY0Nsb2NrKDEyKTtcbiAgICAgICAgICAgIHRoaXMuJGluY1BDKDIgKyBzOCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSlJfRihmbGFnKSB7XG4gICAgICAgIGlmICghdGhpcy4kZ2V0RihmbGFnKSkge1xuICAgICAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHM4ID0gVXRpbHMuZ2V0U2lnbmVkVmFsdWU4KHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDICsgMSkpO1xuICAgICAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTIpO1xuICAgICAgICAgICAgdGhpcy4kaW5jUEMoMiArIHM4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBKUCgpIHtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTYpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICAgICAgdGhpcy5yLlBDID0gdGhpcy5tbXUuZ2V0SW1tZWRpYXRlMTYodGhpcy5yLlBDKTtcbiAgICB9XG4gICAgSlBfRihmbGFnKSB7XG4gICAgICAgIGlmICh0aGlzLiRnZXRGKGZsYWcpKSB7XG4gICAgICAgICAgICB0aGlzLmNwdS5yZWdpc3Rlci5QQyA9IHRoaXMubW11LmdldEltbWVkaWF0ZTE2KHRoaXMuci5QQyArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygxMik7XG4gICAgfVxuICAgIEpQX05GKGZsYWcpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRnZXRGKGZsYWcpKSB7XG4gICAgICAgICAgICB0aGlzLmNwdS5yZWdpc3Rlci5QQyA9IHRoaXMubW11LmdldEltbWVkaWF0ZTE2KHRoaXMuci5QQyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNwdS5yZWdpc3Rlci5QQysrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDEyKTtcbiAgICB9XG4gICAgSlBfUlIocjFoLCByMWwpIHtcbiAgICAgICAgdGhpcy5yLlBDID0gdGhpcy5jcHUucmVhZDE2KHIxaCwgcjFsKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soNCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBEQUEoKSB7XG4gICAgICAgIGxldCBjb3JyZWN0aW9uID0gMDtcbiAgICAgICAgbGV0IHYgPSB0aGlzLnIuQTtcbiAgICAgICAgaWYgKHRoaXMuJGdldEYoQ1BVRmxhZ1R5cGUuSCkgfHwgKCF0aGlzLiRnZXRGKENQVUZsYWdUeXBlLk4pICYmICh2ICYgMHhmKSA+IDkpKSB7XG4gICAgICAgICAgICBjb3JyZWN0aW9uIHw9IDB4NjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy4kZ2V0RihDUFVGbGFnVHlwZS5IKSB8fCAoIXRoaXMuJGdldEYoQ1BVRmxhZ1R5cGUuTikgJiYgKHYgPiAweDk5KSkpIHtcbiAgICAgICAgICAgIGNvcnJlY3Rpb24gfD0gMHg2MDtcbiAgICAgICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdiArPSAodGhpcy4kZ2V0RihDUFVGbGFnVHlwZS5OKSA/IC1jb3JyZWN0aW9uIDogY29ycmVjdGlvbikgJiAweEZGO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIENQKCkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5jcHUucmVhZDgoJ0EnKSAtIHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuTiwgMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgKCF0aGlzLiRpc0JpdDRCb3Jyb3codGhpcy5jcHUucmVhZDgoJ0EnKSwgdikpKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCAodGhpcy5jcHUucmVhZDgoJ0EnKSA8IHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKSkpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIENQTCgpIHtcbiAgICAgICAgdGhpcy5yLkEgPSB+dGhpcy5yLkE7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuTiwgMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgQ0NGKCkge1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5IKTtcbiAgICAgICAgaWYgKHRoaXMuJGdldEYoQ1BVRmxhZ1R5cGUuQykpIHtcbiAgICAgICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5DKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soNCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBTQ0YoKSB7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgMSk7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIENQX1IocjEpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY3B1LnJlYWQ4KCdBJykgLSB0aGlzLmNwdS5yZWFkOChyMSk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5OLCAxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAoIXRoaXMuJGlzQml0NEJvcnJvdyh0aGlzLmNwdS5yZWFkOCgnQScpLCB2KSkpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsICh0aGlzLmNwdS5yZWFkOCgnQScpIDwgdGhpcy5jcHUucmVhZDgocjEpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgQ1BfUlIocjFoLCByMWwpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCk7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNwdS5yZWFkOCgnQScpIC0gdGhpcy5tbXUucmVhZChwb2ludGVyKTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsICdBJyk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLk4sIDEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICghdGhpcy4kaXNCaXQ0Qm9ycm93KHRoaXMuY3B1LnJlYWQ4KCdBJyksIHYpKSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgKHRoaXMuY3B1LnJlYWQ4KCdBJykgPCB0aGlzLm1tdS5yZWFkKHBvaW50ZXIpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgSEFMVCgpIHtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soNCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBPUigpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKSBeIHRoaXMuY3B1LnJlYWQ4KCdBJyk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5DKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBPUl9SKHIxKSB7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNwdS5yZWFkOChyMSkgXiB0aGlzLmNwdS5yZWFkOCgnQScpO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodiwgJ0EnKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgT1JfUlIocjFoLCByMWwpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCk7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLm1tdS5yZWFkKHBvaW50ZXIpIF4gdGhpcy5jcHUucmVhZDgoJ0EnKTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsICdBJyk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5IKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkMpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIE5PUCgpIHtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soNCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDEpO1xuICAgIH1cbiAgICBQT1BfUlIocjFoLCByMWwpIHtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHRoaXMubW11LnJlYWQodGhpcy5yLlNQIHx8IDApLCByMWwpO1xuICAgICAgICB0aGlzLnIuU1ArKztcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHRoaXMubW11LnJlYWQodGhpcy5yLlNQIHx8IDApLCByMWgpO1xuICAgICAgICB0aGlzLnIuU1ArKztcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTIpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgUFVTSF9SUihyMWgsIHIxbCkge1xuICAgICAgICB0aGlzLnIuU1AtLTtcbiAgICAgICAgdGhpcy5tbXUud3JpdGUodGhpcy5yLlNQLCB0aGlzLmNwdS5yZWFkOChyMWgpKTtcbiAgICAgICAgdGhpcy5yLlNQLS07XG4gICAgICAgIHRoaXMubW11LndyaXRlKHRoaXMuci5TUCwgdGhpcy5jcHUucmVhZDgocjFsKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDE2KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIFJFVCgpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMubW11LmdldEltbWVkaWF0ZTE2KHRoaXMuci5TUCk7XG4gICAgICAgIHRoaXMuY3B1LnJlZ2lzdGVyLlBDID0gdjtcbiAgICAgICAgdGhpcy5yLlNQICs9IDI7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDE2KTtcbiAgICB9XG4gICAgUkVUSSgpIHtcbiAgICAgICAgdGhpcy5jcHUuSU1FID0gMTtcbiAgICAgICAgdGhpcy5yLlBDID0gdGhpcy5tbXUucmVhZCh0aGlzLnIuU1ApO1xuICAgICAgICB0aGlzLnIuU1AgKz0gMjtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTYpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgUkVUX0YoZmxhZykge1xuICAgICAgICBpZiAodGhpcy4kZ2V0RihmbGFnKSkge1xuICAgICAgICAgICAgdGhpcy5yLlBDID0gdGhpcy5tbXUucmVhZCh0aGlzLnIuU1ApO1xuICAgICAgICAgICAgdGhpcy5yLlNQICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMjApO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgUkVUX05GKGZsYWcpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRnZXRGKGZsYWcpKSB7XG4gICAgICAgICAgICB0aGlzLnIuUEMgPSB0aGlzLm1tdS5yZWFkKHRoaXMuci5TUCk7XG4gICAgICAgICAgICB0aGlzLnIuU1AgKz0gMjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIFJFU19iX1IoYml0LCByMSkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5jcHUucmVhZDgocjEpICYgfmJpdDtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBSRVNfYl9SUihiaXQsIHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjFoLCByMWwpO1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5tbXUucmVhZChwb2ludGVyKSAmIH5iaXQ7XG4gICAgICAgIHRoaXMubW11LndyaXRlKHBvaW50ZXIsIHYpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygxNik7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBSU1QoYnl0ZU5yKSB7XG4gICAgICAgIHRoaXMuci5TUCAtPSAxO1xuICAgICAgICB0aGlzLm1tdS53cml0ZSh0aGlzLnIuU1AsICh0aGlzLnIuUEMgPj4gNCkgJiAweEYpO1xuICAgICAgICB0aGlzLnIuU1AgLT0gMTtcbiAgICAgICAgdGhpcy5tbXUud3JpdGUodGhpcy5yLlNQLCB0aGlzLnIuUEMgJiAweEYpO1xuICAgICAgICB0aGlzLmNwdS5yZWdpc3Rlci5QQyA9IGJ5dGVOcjtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTYpO1xuICAgIH1cbiAgICBTRVRfYl9SKGJpdCwgcjEpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY3B1LnJlYWQ4KHIxKSB8IGJpdDtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBTRVRfYl9SUihiaXQsIHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjFoLCByMWwpO1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5tbXUucmVhZChwb2ludGVyKSB8IGJpdDtcbiAgICAgICAgdGhpcy5tbXUud3JpdGUocG9pbnRlciwgdik7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDE2KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIFNMQV9SKHIxKSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLmNwdS5yZWFkOChyMSk7XG4gICAgICAgIGNvbnN0IG9sZEJpdDcgPSByICYgMHg4MDtcbiAgICAgICAgY29uc3QgdiA9IChyIDw8IDEpO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodiwgcjEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgb2xkQml0NyAmJiAxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBTTEFfUlIocjFoLCByMWwpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQxNihyMWgsIHIxbCk7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLm1tdS5yZWFkKHBvaW50ZXIpO1xuICAgICAgICBjb25zdCBvbGRCaXQ3ID0gbSAmIDB4ODA7XG4gICAgICAgIGNvbnN0IHYgPSAobSA8PCAxKTtcbiAgICAgICAgdGhpcy5tbXUud3JpdGUocG9pbnRlciwgdik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5IKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCBvbGRCaXQ3ICYgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDE2KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIFNSQV9SKHIxKSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLmNwdS5yZWFkOChyMSk7XG4gICAgICAgIGNvbnN0IG9sZEJpdDAgPSByICYgMHgwMTtcbiAgICAgICAgY29uc3Qgb2xkQml0NyA9IHIgJiAweDgwO1xuICAgICAgICBjb25zdCB2ID0gKHIgPj4gMSkgJiBvbGRCaXQ3O1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodiwgcjEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgb2xkQml0MCAmIDEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg4KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIFNSQV9SUihyMWgsIHIxbCkge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jcHUucmVhZDE2KHIxaCwgcjFsKTtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMubW11LnJlYWQocG9pbnRlcik7XG4gICAgICAgIGNvbnN0IG9sZEJpdDAgPSBtICYgMHgwMTtcbiAgICAgICAgY29uc3Qgb2xkQml0NyA9IG0gJiAweDgwO1xuICAgICAgICBjb25zdCB2ID0gKG0gPj4gMSkgJiBvbGRCaXQ3O1xuICAgICAgICB0aGlzLm1tdS53cml0ZShwb2ludGVyLCB2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsIG9sZEJpdDAgJiAxKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soMTYpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgU1JMX1IocjEpIHtcbiAgICAgICAgY29uc3QgciA9IHRoaXMuY3B1LnJlYWQ4KHIxKTtcbiAgICAgICAgY29uc3Qgb2xkQml0MCA9IHIgJiAweDAxO1xuICAgICAgICBjb25zdCB2ID0gKHIgPj4gMSk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCByMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5IKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCBvbGRCaXQwICYgMSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgU1JMX1JSKHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjFoLCByMWwpO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5tbXUucmVhZChwb2ludGVyKTtcbiAgICAgICAgY29uc3Qgb2xkQml0MCA9IG0gJiAweDAxO1xuICAgICAgICBjb25zdCB2ID0gKG0gPj4gMSk7XG4gICAgICAgIHRoaXMubW11LndyaXRlKHBvaW50ZXIsIHYpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgb2xkQml0MCAmIDEpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jaygxNik7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBTVE9QKCkge1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIFNVQigpIHtcbiAgICAgICAgY29uc3QgdiA9ICh0aGlzLmNwdS5yZWFkOCgnQScpIC0gdGhpcy5tbXUuZ2V0SW1tZWRpYXRlOCh0aGlzLnIuUEMpKSAmIDB4RkY7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5OLCAxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAoIXRoaXMuJGlzQml0NEJvcnJvdyh0aGlzLmNwdS5yZWFkOCgnQScpLCB2KSkpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsICghdGhpcy4kaXNCaXQzQm9ycm93KHRoaXMuY3B1LnJlYWQ4KCdBJyksIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgU1VCX1IocjEpIHtcbiAgICAgICAgY29uc3QgdiA9ICh0aGlzLmNwdS5yZWFkOCgnQScpIC0gdGhpcy5jcHUucmVhZDgocjEpKSAmIDB4RkY7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5OLCAxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAoIXRoaXMuJGlzQml0NEJvcnJvdyh0aGlzLmNwdS5yZWFkOCgnQScpLCB2KSkpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsICghdGhpcy4kaXNCaXQzQm9ycm93KHRoaXMuY3B1LnJlYWQ4KCdBJyksIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDQpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgU1VCX1JSKHIxaCwgcjFsKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmNwdS5yZWFkMTYocjFoLCByMWwpO1xuICAgICAgICBjb25zdCB2ID0gKHRoaXMuY3B1LnJlYWQ4KCdBJykgLSB0aGlzLm1tdS5yZWFkKHBvaW50ZXIpKSAmIDB4RkY7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5OLCAxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAoIXRoaXMuJGlzQml0NEJvcnJvdyh0aGlzLmNwdS5yZWFkOCgnQScpLCB2KSkpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsICghdGhpcy4kaXNCaXQzQm9ycm93KHRoaXMuY3B1LnJlYWQ4KCdBJyksIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgU0JDX1JfUihyMSwgcjIpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMuY3B1LnJlYWQ4KHIyKSArICh0aGlzLiRnZXRGKENQVUZsYWdUeXBlLkMpID8gMSA6IDApO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodGhpcy5jcHUucmVhZDgocjEpIC0gdiwgcjEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5OLCAxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5ILCAoIXRoaXMuJGlzQml0NEJvcnJvdyh0aGlzLmNwdS5yZWFkOChyMSksIHYpKSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuQywgKCF0aGlzLiRpc0JpdDNCb3Jyb3codGhpcy5jcHUucmVhZDgocjEpLCB2KSkpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIFNCQ19SX2Q4KHIxKSB7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLm1tdS5nZXRJbW1lZGlhdGU4KHRoaXMuci5QQykgKyAodGhpcy4kZ2V0RihDUFVGbGFnVHlwZS5DKSA/IDEgOiAwKTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHRoaXMuY3B1LnJlYWQ4KHIxKSAtIHYsIHIxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuTiwgMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuSCwgKCF0aGlzLiRpc0JpdDRCb3Jyb3codGhpcy5jcHUucmVhZDgocjEpLCB2KSkpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkMsICghdGhpcy4kaXNCaXQzQm9ycm93KHRoaXMuY3B1LnJlYWQ4KHIxKSwgdikpKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBTQkNfUl9SUihyMSwgcjJoLCByMmwpIHtcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuY3B1LnJlYWQxNihyMmgsIHIybCk7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLm1tdS5yZWFkKHBvaW50ZXIpICsgKHRoaXMuJGdldEYoQ1BVRmxhZ1R5cGUuQykgPyAxIDogMCk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh0aGlzLmNwdS5yZWFkOChyMSkgLSB2LCByMSk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLk4sIDEpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLkgsICghdGhpcy4kaXNCaXQ0Qm9ycm93KHRoaXMuY3B1LnJlYWQ4KHIxKSwgdikpKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5DLCAoIXRoaXMuJGlzQml0M0JvcnJvdyh0aGlzLmNwdS5yZWFkOChyMSksIHYpKSk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG4gICAgU1dBUF9SKHIxKSB7XG4gICAgICAgIGNvbnN0IGxvd0JpdHMgPSB0aGlzLmNwdS5yZWFkOChyMSkgJiAweDBGO1xuICAgICAgICBjb25zdCBoaWdoQml0cyA9IHRoaXMuY3B1LnJlYWQ4KHIxKSAmIDB4RjA7XG4gICAgICAgIGNvbnN0IHYgPSAoKGxvd0JpdHMgPDwgNCkgfCAoaGlnaEJpdHMgPj4gNCkgJiAweEZGKTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsIHIxKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygyKTtcbiAgICB9XG4gICAgU1dBUF9SUihyMWgsIHIxbCkge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jcHUucmVhZDE2KHIxaCwgcjFsKTtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMubW11LnJlYWQocG9pbnRlcik7XG4gICAgICAgIGNvbnN0IGxvd0JpdHMgPSBtICYgMHgwRjtcbiAgICAgICAgY29uc3QgaGlnaEJpdHMgPSBtICYgMHhGMDtcbiAgICAgICAgY29uc3QgdiA9ICgobG93Qml0cyA8PCA0KSB8IChoaWdoQml0cyA+PiA0KSAmIDB4RkYpO1xuICAgICAgICB0aGlzLm1tdS53cml0ZShwb2ludGVyLCB2KTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDE2KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMik7XG4gICAgfVxuICAgIFhPUigpIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMubW11LmdldEltbWVkaWF0ZTgodGhpcy5yLlBDKSBeIHRoaXMuY3B1LnJlYWQ4KCdBJyk7XG4gICAgICAgIHRoaXMuY3B1LndyaXRlOCh2LCAnQScpO1xuICAgICAgICB0aGlzLiRzZXRGKENQVUZsYWdUeXBlLlosICF2KTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLk4pO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuSCk7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5DKTtcbiAgICAgICAgdGhpcy4kaW5jQ2xvY2soOCk7XG4gICAgICAgIHRoaXMuJGluY1BDKDIpO1xuICAgIH1cbiAgICBYT1JfUihyMSkge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5jcHUucmVhZDgocjEpIF4gdGhpcy5jcHUucmVhZDgoJ0EnKTtcbiAgICAgICAgdGhpcy5jcHUud3JpdGU4KHYsICdBJyk7XG4gICAgICAgIHRoaXMuJHNldEYoQ1BVRmxhZ1R5cGUuWiwgIXYpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuTik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5IKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkMpO1xuICAgICAgICB0aGlzLiRpbmNDbG9jayg0KTtcbiAgICAgICAgdGhpcy4kaW5jUEMoMSk7XG4gICAgfVxuICAgIFhPUl9SUihyMWgsIHIxbCkge1xuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5jcHUucmVhZDE2KHIxaCwgcjFsKTtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMubW11LnJlYWQocG9pbnRlcikgXiB0aGlzLmNwdS5yZWFkOCgnQScpO1xuICAgICAgICB0aGlzLmNwdS53cml0ZTgodiwgJ0EnKTtcbiAgICAgICAgdGhpcy4kc2V0RihDUFVGbGFnVHlwZS5aLCAhdik7XG4gICAgICAgIHRoaXMuJHJlc2V0RihDUFVGbGFnVHlwZS5OKTtcbiAgICAgICAgdGhpcy4kcmVzZXRGKENQVUZsYWdUeXBlLkgpO1xuICAgICAgICB0aGlzLiRyZXNldEYoQ1BVRmxhZ1R5cGUuQyk7XG4gICAgICAgIHRoaXMuJGluY0Nsb2NrKDgpO1xuICAgICAgICB0aGlzLiRpbmNQQygxKTtcbiAgICB9XG59XG5leHBvcnQgeyBPcGNvZGVzIH07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBJQ2FydHJpZGdlVHlwZTtcbihmdW5jdGlvbiAoSUNhcnRyaWRnZVR5cGUpIHtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIlJPTV9PTkxZXCJdID0gMF0gPSBcIlJPTV9PTkxZXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNQkMxXCJdID0gMV0gPSBcIk1CQzFcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIk1CQzFfUkFNXCJdID0gMl0gPSBcIk1CQzFfUkFNXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNQkMxX1JBTV9CQVRURVJZXCJdID0gM10gPSBcIk1CQzFfUkFNX0JBVFRFUllcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIk1CQzJcIl0gPSA1XSA9IFwiTUJDMlwiO1xuICAgIElDYXJ0cmlkZ2VUeXBlW0lDYXJ0cmlkZ2VUeXBlW1wiTUJDMl9CQVRURVJZXCJdID0gNl0gPSBcIk1CQzJfQkFUVEVSWVwiO1xuICAgIElDYXJ0cmlkZ2VUeXBlW0lDYXJ0cmlkZ2VUeXBlW1wiUk9NX1JBTVwiXSA9IDhdID0gXCJST01fUkFNXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJST01fUkFNX0JBVFRFUllcIl0gPSA5XSA9IFwiUk9NX1JBTV9CQVRURVJZXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNTU0wMVwiXSA9IDExXSA9IFwiTU1NMDFcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIk1NTTAxX1JBTVwiXSA9IDEyXSA9IFwiTU1NMDFfUkFNXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNTU0wMV9SQU1fQkFUVEVSWVwiXSA9IDEzXSA9IFwiTU1NMDFfUkFNX0JBVFRFUllcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIk1CQzNfVElNRVJfQkFUVEVSWVwiXSA9IDE1XSA9IFwiTUJDM19USU1FUl9CQVRURVJZXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNQkMzX1RJTUVSX1JBTV9CQVRURVJZXCJdID0gMTZdID0gXCJNQkMzX1RJTUVSX1JBTV9CQVRURVJZXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNQkMzXCJdID0gMTddID0gXCJNQkMzXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNQkMzX1JBTVwiXSA9IDE4XSA9IFwiTUJDM19SQU1cIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIk1CQzNfUkFNX0JBVFRFUllcIl0gPSAxOV0gPSBcIk1CQzNfUkFNX0JBVFRFUllcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIk1CQzVcIl0gPSAyNV0gPSBcIk1CQzVcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIk1CQzVfUkFNXCJdID0gMjZdID0gXCJNQkM1X1JBTVwiO1xuICAgIElDYXJ0cmlkZ2VUeXBlW0lDYXJ0cmlkZ2VUeXBlW1wiTUJDNV9SQU1fQkFUVEVSWVwiXSA9IDI3XSA9IFwiTUJDNV9SQU1fQkFUVEVSWVwiO1xuICAgIElDYXJ0cmlkZ2VUeXBlW0lDYXJ0cmlkZ2VUeXBlW1wiTUJDNV9SVU1CTEVcIl0gPSAyOF0gPSBcIk1CQzVfUlVNQkxFXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJNQkM1X1JVTUJMRV9SQU1cIl0gPSAyOV0gPSBcIk1CQzVfUlVNQkxFX1JBTVwiO1xuICAgIElDYXJ0cmlkZ2VUeXBlW0lDYXJ0cmlkZ2VUeXBlW1wiTUJDNV9SVU1CTEVfQkFUVEVSWVwiXSA9IDMwXSA9IFwiTUJDNV9SVU1CTEVfQkFUVEVSWVwiO1xuICAgIElDYXJ0cmlkZ2VUeXBlW0lDYXJ0cmlkZ2VUeXBlW1wiTUJDNlwiXSA9IDMyXSA9IFwiTUJDNlwiO1xuICAgIElDYXJ0cmlkZ2VUeXBlW0lDYXJ0cmlkZ2VUeXBlW1wiTUJDN19TRU5TT1JfUlVNQkxFX1JBTV9CQVRURVJZXCJdID0gMzRdID0gXCJNQkM3X1NFTlNPUl9SVU1CTEVfUkFNX0JBVFRFUllcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIlBPQ0tFVF9DQU1FUkFcIl0gPSAyNTJdID0gXCJQT0NLRVRfQ0FNRVJBXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJCQU5EQUlfVEFNQTVcIl0gPSAyNTNdID0gXCJCQU5EQUlfVEFNQTVcIjtcbiAgICBJQ2FydHJpZGdlVHlwZVtJQ2FydHJpZGdlVHlwZVtcIkhVQzNcIl0gPSAyNTRdID0gXCJIVUMzXCI7XG4gICAgSUNhcnRyaWRnZVR5cGVbSUNhcnRyaWRnZVR5cGVbXCJIVUMzX1JBTV9CQVRURVJZXCJdID0gMjU1XSA9IFwiSFVDM19SQU1fQkFUVEVSWVwiO1xufSkoSUNhcnRyaWRnZVR5cGUgfHwgKElDYXJ0cmlkZ2VUeXBlID0ge30pKTtcbmNsYXNzIE1NVSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuQk9PVF9ST00gPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDMxLCAweEZFLCAweEZGLCAweEFGLCAweDIxLCAweEZGLCAweDlGLCAweDMyLCAweENCLCAweDdDLCAweDIwLCAweEZCLCAweDIxLCAweDI2LCAweEZGLCAweDBFLFxuICAgICAgICAgICAgMHgxMSwgMHgzRSwgMHg4MCwgMHgzMiwgMHhFMiwgMHgwQywgMHgzRSwgMHhGMywgMHhFMiwgMHgzMiwgMHgzRSwgMHg3NywgMHg3NywgMHgzRSwgMHhGQywgMHhFMCxcbiAgICAgICAgICAgIDB4NDcsIDB4MTEsIDB4MDQsIDB4MDEsIDB4MjEsIDB4MTAsIDB4ODAsIDB4MUEsIDB4Q0QsIDB4OTUsIDB4MDAsIDB4Q0QsIDB4OTYsIDB4MDAsIDB4MTMsIDB4N0IsXG4gICAgICAgICAgICAweEZFLCAweDM0LCAweDIwLCAweEYzLCAweDExLCAweEQ4LCAweDAwLCAweDA2LCAweDA4LCAweDFBLCAweDEzLCAweDIyLCAweDIzLCAweDA1LCAweDIwLCAweEY5LFxuICAgICAgICAgICAgMHgzRSwgMHgxOSwgMHhFQSwgMHgxMCwgMHg5OSwgMHgyMSwgMHgyRiwgMHg5OSwgMHgwRSwgMHgwQywgMHgzRCwgMHgyOCwgMHgwOCwgMHgzMiwgMHgwRCwgMHgyMCxcbiAgICAgICAgICAgIDB4RjksIDB4MkUsIDB4MEYsIDB4MTgsIDB4RjMsIDB4NjcsIDB4M0UsIDB4NjQsIDB4NTcsIDB4RTAsIDB4NDIsIDB4M0UsIDB4OTEsIDB4RTAsIDB4NDAsIDB4MDQsXG4gICAgICAgICAgICAweDFFLCAweDAyLCAweDBFLCAweDBDLCAweEYwLCAweDQ0LCAweEZFLCAweDkwLCAweDIwLCAweEZBLCAweDBELCAweDIwLCAweEY3LCAweDFELCAweDIwLCAweEYyLFxuICAgICAgICAgICAgMHgwRSwgMHgxMywgMHgyNCwgMHg3QywgMHgxRSwgMHg4MywgMHhGRSwgMHg2MiwgMHgyOCwgMHgwNiwgMHgxRSwgMHhDMSwgMHhGRSwgMHg2NCwgMHgyMCwgMHgwNixcbiAgICAgICAgICAgIDB4N0IsIDB4RTIsIDB4MEMsIDB4M0UsIDB4ODcsIDB4RjIsIDB4RjAsIDB4NDIsIDB4OTAsIDB4RTAsIDB4NDIsIDB4MTUsIDB4MjAsIDB4RDIsIDB4MDUsIDB4MjAsXG4gICAgICAgICAgICAweDRGLCAweDE2LCAweDIwLCAweDE4LCAweENCLCAweDRGLCAweDA2LCAweDA0LCAweEM1LCAweENCLCAweDExLCAweDE3LCAweEMxLCAweENCLCAweDExLCAweDE3LFxuICAgICAgICAgICAgMHgwNSwgMHgyMCwgMHhGNSwgMHgyMiwgMHgyMywgMHgyMiwgMHgyMywgMHhDOSwgMHhDRSwgMHhFRCwgMHg2NiwgMHg2NiwgMHhDQywgMHgwRCwgMHgwMCwgMHgwQixcbiAgICAgICAgICAgIDB4MDMsIDB4NzMsIDB4MDAsIDB4ODMsIDB4MDAsIDB4MEMsIDB4MDAsIDB4MEQsIDB4MDAsIDB4MDgsIDB4MTEsIDB4MUYsIDB4ODgsIDB4ODksIDB4MDAsIDB4MEUsXG4gICAgICAgICAgICAweERDLCAweENDLCAweDZFLCAweEU2LCAweERELCAweERELCAweEQ5LCAweDk5LCAweEJCLCAweEJCLCAweDY3LCAweDYzLCAweDZFLCAweDBFLCAweEVDLCAweENDLFxuICAgICAgICAgICAgMHhERCwgMHhEQywgMHg5OSwgMHg5RiwgMHhCQiwgMHhCOSwgMHgzMywgMHgzRSwgMHgzYywgMHg0MiwgMHhCOSwgMHhBNSwgMHhCOSwgMHhBNSwgMHg0MiwgMHg0QyxcbiAgICAgICAgICAgIDB4MjEsIDB4MDQsIDB4MDEsIDB4MTEsIDB4QTgsIDB4MDAsIDB4MUEsIDB4MTMsIDB4QkUsIDB4MjAsIDB4RkUsIDB4MjMsIDB4N0QsIDB4RkUsIDB4MzQsIDB4MjAsXG4gICAgICAgICAgICAweEY1LCAweDA2LCAweDE5LCAweDc4LCAweDg2LCAweDIzLCAweDA1LCAweDIwLCAweEZCLCAweDg2LCAweDIwLCAweEZFLCAweDNFLCAweDAxLCAweEUwLCAweDUwXG4gICAgICAgIF0pO1xuICAgICAgICB0aGlzLlJPTUJhbmsgPSAweDQwMDA7XG4gICAgICAgIHRoaXMuUkFNQmFuayA9IDB4MDAwMDtcbiAgICAgICAgdGhpcy5jYXJ0cmlkZ2VUeXBlID0gMHgwMDtcbiAgICAgICAgdGhpcy5za2lwQmlvcyA9IHRydWU7XG4gICAgICAgIHRoaXMuSUUgPSAwO1xuICAgICAgICB0aGlzLklGID0gMDtcbiAgICAgICAgdGhpcy5iaW9zID0gdGhpcy5CT09UX1JPTSB8fCBuZXcgVWludDhBcnJheSgyNTUpO1xuICAgICAgICB0aGlzLklPID0gbmV3IFVpbnQ4QXJyYXkoMTI3KTtcbiAgICAgICAgdGhpcy5PQU0gPSBuZXcgVWludDhBcnJheSgxNTkpO1xuICAgICAgICB0aGlzLlJPTSA9IG5ldyBVaW50MTZBcnJheSgxMDI0ICogMTYpO1xuICAgICAgICB0aGlzLlNST00gPSBuZXcgVWludDE2QXJyYXkoMTAyNCAqIDE2KTtcbiAgICAgICAgdGhpcy5FUkFNID0gbmV3IFVpbnQxNkFycmF5KDEwMjQgKiA4KTtcbiAgICAgICAgdGhpcy5IUkFNID0gbmV3IFVpbnQ4QXJyYXkoMTI2KTtcbiAgICAgICAgdGhpcy5XUkFNID0gbmV3IFVpbnQxNkFycmF5KDEwMjQgKiA4KTtcbiAgICAgICAgdGhpcy5WUkFNID0gbmV3IFVpbnQxNkFycmF5KDEwMjQgKiAxNik7XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSB7XG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBuaW50ZW5kb0xvZ286IG51bGwsXG4gICAgICAgICAgICBzaXplOiAwLFxuICAgICAgICAgICAgdmVyc2lvbjogMCxcbiAgICAgICAgICAgIGNhcnRyaWRnZVR5cGU6IDB4MDAsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgc2hhcmVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3NoYXJlZClcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlZCA9IG5ldyBNTVUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZDtcbiAgICB9XG4gICAgbG9hZE5pbnRlbmRvTG9nbygpIHtcbiAgICAgICAgY29uc3Qgc3ByaXRlcyA9IFtdO1xuICAgIH1cbiAgICBzZXRST01NZXRhZGF0YShyb21TaXplKSB7XG4gICAgICAgIGxldCB0aXRsZSA9ICcnO1xuICAgICAgICBsZXQgcHVibGlzaGVyID0gJyc7XG4gICAgICAgIGxldCBuaW50ZW5kb0xvZ28gPSBuZXcgVWludDhBcnJheSg0OCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDc7IGkrKykge1xuICAgICAgICAgICAgbmludGVuZG9Mb2dvW2ldID0gdGhpcy5ST01bMHgxMDQgKyBpXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgICAgIHRpdGxlICs9IHRoaXMuUk9NWzB4MTM0ICsgaV0gIT09IDB4MDAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuUk9NWzB4MTM0ICsgaV0pIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxOyBpKyspIHtcbiAgICAgICAgICAgIHB1Ymxpc2hlciArPSB0aGlzLlJPTVsweDE0NCArIGldICE9PSAweDAwID8gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLlJPTVsweDE0NCArIGldKSA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSB7XG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIG5pbnRlbmRvTG9nbyxcbiAgICAgICAgICAgIHNpemU6IHJvbVNpemUsXG4gICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLlJPTVsweDE0Q10sXG4gICAgICAgICAgICBjYXJ0cmlkZ2VUeXBlOiB0aGlzLlJPTVsweDE0N11cbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coJ1JPTSBtZXRhZGF0YTonLCB0aGlzLm1ldGFkYXRhKTtcbiAgICB9XG4gICAgbG9hZFJPTUludG9NZW1vcnkocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByb21EYXRhID0gdGhpcy5yYXdSb21EYXRhID0gbmV3IFVpbnQxNkFycmF5KHlpZWxkIHRoaXMuZmV0Y2hST00ocGF0aCkpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGFkZHJlc3MgPSAwOyBhZGRyZXNzIDwgcm9tRGF0YS5ieXRlTGVuZ3RoOyBhZGRyZXNzKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZHJlc3MgPD0gMHgwMEZGICYmICF0aGlzLnNraXBCaW9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpb3NbYWRkcmVzc10gPSByb21EYXRhW2FkZHJlc3NdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHgwMDAwICYmIGFkZHJlc3MgPD0gMHgzRkZGKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJPTVthZGRyZXNzXSA9IHJvbURhdGFbYWRkcmVzc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYWRkcmVzcyA+PSAweDQwMDAgJiYgYWRkcmVzcyA8PSAweDdGRkYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU1JPTVthZGRyZXNzIC0gMHg0MDAwXSA9IHJvbURhdGFbYWRkcmVzc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRST01NZXRhZGF0YShyb21EYXRhLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgbG9hZGluZyB0aGUgUk9NOycsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmZXRjaFJPTShyb21OYW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBodHRwLm9ubG9hZCA9IChlKSA9PiByZXNvbHZlKG5ldyBVaW50OEFycmF5KGh0dHAucmVzcG9uc2UpKTtcbiAgICAgICAgICAgIGh0dHAub25lcnJvciA9IChlcnIpID0+IHJlamVjdChlcnIpO1xuICAgICAgICAgICAgaHR0cC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgaHR0cC5vcGVuKCdHRVQnLCBgLi8ke3JvbU5hbWV9YCk7XG4gICAgICAgICAgICBodHRwLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWRST01CeUNhcnRyaWRnZVR5cGUoYnl0ZSkge1xuICAgICAgICBzd2l0Y2ggKGJ5dGUpIHtcbiAgICAgICAgICAgIGNhc2UgSUNhcnRyaWRnZVR5cGUuUk9NX09OTFk6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBgVW5zdXBwb3J0ZWQgY2FydHJpZGdlIHR5cGU6ICgke2J5dGV9KWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3dpdGNoUk9NQmFuayhyb21CYW5rTnIgPSAwKSB7XG4gICAgICAgIHRoaXMuU1JPTVsweDAwMDBdID0gdGhpcy5yYXdSb21EYXRhW3RoaXMuUk9NQmFuayAqIHJvbUJhbmtOcl07XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgIH1cbiAgICBnZXRJbW1lZGlhdGU4KHBjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQocGMpICYgMHhGRjtcbiAgICB9XG4gICAgZ2V0SW1tZWRpYXRlMTYocGMpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnJlYWQocGMpIHwgKHRoaXMucmVhZChwYyArIDEpIDw8IDgpKSAmIDB4RkZGRjtcbiAgICB9XG4gICAgcmVhZChhZGRyZXNzKSB7XG4gICAgICAgIGlmIChhZGRyZXNzIDwgMHgwMDAwIHx8IGFkZHJlc3MgPiAweEZGRkYpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlYWQgYXR0ZW1wdDogTWVtb3J5IGFkZHJlc3MgJHthZGRyZXNzfSBpcyBvdXQgb2YgbWVtb3J5IGJvdW5kc2ApO1xuICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDAwMDAgJiYgYWRkcmVzcyA8PSAweDNGRkYpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5za2lwQmlvcykge1xuICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzIDw9IDB4MDBGRikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5iaW9zW2FkZHJlc3NdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNwdS5yZWdpc3Rlci5QQyA9PSAweDAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lwQmlvcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUk9NW2FkZHJlc3NdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHg0MDAwICYmIGFkZHJlc3MgPD0gMHg3RkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5TUk9NW2FkZHJlc3MgLSAweDQwMDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHg4MDAwICYmIGFkZHJlc3MgPD0gMHg5RkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5WUkFNW2FkZHJlc3MgLSAweDgwMDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHhBMDAwICYmIGFkZHJlc3MgPD0gMHhCRkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5FUkFNW2FkZHJlc3MgLSAweEEwMDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHhDMDAwICYmIGFkZHJlc3MgPD0gMHhDRkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5XUkFNW2FkZHJlc3MgLSAweEMwMDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHhEMDAwICYmIGFkZHJlc3MgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5XUkFNW2FkZHJlc3MgLSAweEQwMDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHhFMDAwICYmIGFkZHJlc3MgPD0gMHhGREZGKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRyZXNzID49IDB4RkUwMCAmJiBhZGRyZXNzIDw9IDB4RkU5Rikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuT0FNW2FkZHJlc3MgLSAweEZFMDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHhGRUEwICYmIGFkZHJlc3MgPD0gMHhGRUZGKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRyZXNzID49IDB4RkYwMCAmJiBhZGRyZXNzIDw9IDB4RkY3Rikge1xuICAgICAgICAgICAgaWYgKGFkZHJlc3MgPT09IDB4RkYwRilcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5JRjtcbiAgICAgICAgICAgIHN3aXRjaCAoYWRkcmVzcyAmIDB4MDBGMCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMHg0MDpcbiAgICAgICAgICAgICAgICBjYXNlIDB4NTA6XG4gICAgICAgICAgICAgICAgY2FzZSAweDYwOlxuICAgICAgICAgICAgICAgIGNhc2UgMHg3MDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3B1LnJlYWQoYWRkcmVzcyk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWRkcmVzcyA+PSAweEZGODAgJiYgYWRkcmVzcyA8PSAweEZGRkUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSOiAweEZGODAgLSAweEZGRkUgLS0+IEhpZ2ggUkFNIChIUkFNKScsIGAweCR7YWRkcmVzcy50b1N0cmluZygxNil9YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5IUkFNWyhhZGRyZXNzIC0gMHhGRjgwKSAmIDB4N0ZdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPT0gMHhGRkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JRTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGBVbmhhbmRsZWQgYWRkcmVzczogJHthZGRyZXNzfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd3JpdGUoYWRkcmVzcywgdmFsdWUpIHtcbiAgICAgICAgaWYgKGFkZHJlc3MgPT09IDB4ODEpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb3V0cHV0IGJsYXJnZzonLCBhZGRyZXNzKTtcbiAgICAgICAgaWYgKGFkZHJlc3MgPCAweDAwMDAgfHwgYWRkcmVzcyA+IDB4RkZGRilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgV3JpdGUgYXR0ZW1wdDogTWVtb3J5IGFkZHJlc3MgJHthZGRyZXNzfSBpcyBvdXQgb2YgbWVtb3J5IGJvdW5kc2ApO1xuICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDAwMDAgJiYgYWRkcmVzcyA8PSAweDNGRkYpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5za2lwQmlvcykge1xuICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzIDw9IDB4MDBGRikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpb3NbYWRkcmVzcyAtIDB4MDBGRl0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUk9NW2FkZHJlc3NdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ST01bYWRkcmVzc10gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRyZXNzID49IDB4NDAwMCAmJiBhZGRyZXNzIDw9IDB4N0ZGRikge1xuICAgICAgICAgICAgdGhpcy5TUk9NW2FkZHJlc3MgLSAweDQwMDBdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWRkcmVzcyA+PSAweDgwMDAgJiYgYWRkcmVzcyA8PSAweDlGRkYpIHtcbiAgICAgICAgICAgIHRoaXMuVlJBTVthZGRyZXNzIC0gMHg4MDAwXSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKGFkZHJlc3MgPD0gMHg5MDAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5WUkFNW2FkZHJlc3MgJiAweDFGRkYgLSAweDgwMDBdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5ncHUudXBkYXRlVGlsZShhZGRyZXNzLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWRkcmVzcyA+PSAweEEwMDAgJiYgYWRkcmVzcyA8PSAweEJGRkYpIHtcbiAgICAgICAgICAgIHRoaXMuRVJBTVthZGRyZXNzIC0gMHhBMDAwXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHhDMDAwICYmIGFkZHJlc3MgPD0gMHhDRkZGKSB7XG4gICAgICAgICAgICB0aGlzLldSQU1bYWRkcmVzcyAtIDB4QzAwMF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRyZXNzID49IDB4RDAwMCAmJiBhZGRyZXNzIDw9IDB4REZGRikge1xuICAgICAgICAgICAgdGhpcy5XUkFNW2FkZHJlc3MgLSAweEQwMDBdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWRkcmVzcyA+PSAweEUwMDAgJiYgYWRkcmVzcyA8PSAweEZERkYpIHtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRyZXNzID49IDB4RkUwMCAmJiBhZGRyZXNzIDw9IDB4RkU5Rikge1xuICAgICAgICAgICAgdGhpcy5PQU1bYWRkcmVzcyAtIDB4RkUwMF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRyZXNzID49IDB4RkVBMCAmJiBhZGRyZXNzIDw9IDB4RkVGRikge1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPj0gMHhGRjAwICYmIGFkZHJlc3MgPD0gMHhGRjdGKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVzogMHhGRjAwIC0gMHhGRjdGIC0tPiBJL08gcmVnaXN0ZXJzJywgYDB4JHthZGRyZXNzLnRvU3RyaW5nKDE2KX1gLCB2YWx1ZS50b1N0cmluZygxNikpO1xuICAgICAgICAgICAgc3dpdGNoIChhZGRyZXNzICYgMHgwMEYwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAweDQwOlxuICAgICAgICAgICAgICAgIGNhc2UgMHg1MDpcbiAgICAgICAgICAgICAgICBjYXNlIDB4NjA6XG4gICAgICAgICAgICAgICAgY2FzZSAweDcwOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdwdS53cml0ZShhZGRyZXNzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5JT1thZGRyZXNzIC0gMHhGRjAwXSA9IHZhbHVlICYgMHhGRjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhZGRyZXNzID49IDB4RkY4MCAmJiBhZGRyZXNzIDw9IDB4RkZGRSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1c6IDB4RkY4MCAtIDB4RkZGRSAtLT4gSGlnaCBSQU0gKEhSQU0pJywgYDB4JHthZGRyZXNzLnRvU3RyaW5nKDE2KX1gLCB2YWx1ZS50b1N0cmluZygxNikpO1xuICAgICAgICAgICAgdGhpcy5IUkFNWyhhZGRyZXNzIC0gMHhGRjgwKSAmIDB4N0ZdID0gdmFsdWUgJiAweEZGO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFkZHJlc3MgPT0gMHhGRkZGKSB7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBgVW5oYW5kbGVkIGFkZHJlc3M6ICR7YWRkcmVzc31gO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHsgTU1VIH07XG4iLCJjbGFzcyBVdGlscyB7XG4gICAgc3RhdGljIGdldFNpZ25lZFZhbHVlOCh2YWx1ZSA9IDApIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID4gMTI3ID8gdmFsdWUgPSAtKCh+dmFsdWUgKyAxKSAmIDI1NSkgOiB2YWx1ZTtcbiAgICB9XG59XG5VdGlscy5kZWNUb0hleCA9IChkZWNpbWFsKSA9PiB7XG4gICAgcmV0dXJuIChkZWNpbWFsKS50b1N0cmluZygxNik7XG59O1xuVXRpbHMuZGVjVG9CaW4gPSAoZGVjaW1hbCkgPT4ge1xuICAgIHJldHVybiAoZGVjaW1hbCA+Pj4gMCkudG9TdHJpbmcoMik7XG59O1xuVXRpbHMuYmluVG9EZWMgPSAoYmluYXJ5KSA9PiB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMik7XG59O1xuVXRpbHMuYmluVG9IZXggPSAoYmluYXJ5KSA9PiB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMikudG9TdHJpbmcoMTYpO1xufTtcblV0aWxzLmhleFRvQmluID0gKGhleGFkZWNpbWFsKSA9PiB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGhleGFkZWNpbWFsLCAxNikudG9TdHJpbmcoMik7XG59O1xuVXRpbHMuaGV4VG9EZWMgPSAoaGV4YWRlY2ltYWwpID0+IHtcbiAgICByZXR1cm4gcGFyc2VJbnQoaGV4YWRlY2ltYWwsIDE2KTtcbn07XG5leHBvcnQgeyBVdGlscyB9O1xuIiwiY2xhc3MgQXVkaW8ge1xuICAgIHBsYXkoKSB7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgfVxufVxuZXhwb3J0IHsgQXVkaW8gfTtcbiIsImltcG9ydCB7IEdQVVNldHRpbmdzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2dwdS1zZXR0aW5ncy5jb25zdGFudHMnO1xuaW1wb3J0IHsgR1BVTW9kZSB9IGZyb20gJy4vbW9kZWxzL2dwdS1tb2RlLm1vZGVsJztcbmNsYXNzIEdQVSB7XG4gICAgY29uc3RydWN0b3Ioc2NhbGUgPSBHUFVTZXR0aW5ncy5TQ0FMRSkge1xuICAgICAgICB0aGlzLk1BWF9OUl9PRl9USUxFUyA9IDM4NDtcbiAgICAgICAgdGhpcy5USUxFX1NJWkUgPSA4O1xuICAgICAgICB0aGlzLm1vZGUgPSAwO1xuICAgICAgICB0aGlzLm1vZGVDbG9jayA9IDA7XG4gICAgICAgIHRoaXMubGluZSA9IDA7XG4gICAgICAgIHRoaXMuc2NYID0gMDtcbiAgICAgICAgdGhpcy5zY1kgPSAwO1xuICAgICAgICB0aGlzLnRpbGVzZXQgPSBbXTtcbiAgICAgICAgdGhpcy5zd2l0Y2hCRyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN3aXRjaExDRCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJnTWFwID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmdUaWxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGFsZXR0ZSA9IHtcbiAgICAgICAgICAgIDA6IFsyNTUsIDI1NSwgMjU1XSxcbiAgICAgICAgICAgIDE6IFsxOTIsIDE5MiwgMTkyXSxcbiAgICAgICAgICAgIDI6IFs5NiwgOTYsIDk2XSxcbiAgICAgICAgICAgIDM6IFswLCAwLCAwXVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbltkYXRhLWFwcD1cIm1ib3lcIl0gPiBjYW52YXNbaWQ9XCJfX1NDUkVFTl9fXCJdJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gR1BVU2V0dGluZ3MuV0lEVEggKiB0aGlzLnNjYWxlO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBHUFVTZXR0aW5ncy5IRUlHSFQgKiB0aGlzLnNjYWxlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgc2hhcmVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3NoYXJlZClcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlZCA9IG5ldyBHUFUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZDtcbiAgICB9XG4gICAgcmVhZChhZGRyZXNzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdncHUgcmVhZCEnKTtcbiAgICAgICAgc3dpdGNoIChhZGRyZXNzKSB7XG4gICAgICAgICAgICBjYXNlIDB4RkY0MDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnN3aXRjaEJHID8gMHgwMSA6IDB4MDApIHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYmdNYXAgPyAweDA4IDogMHgwMCkgfFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5iZ1RpbGUgPyAweDEwIDogMHgwMCkgfFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zd2l0Y2hMQ0QgPyAweDgwIDogMHgwMCkpO1xuICAgICAgICAgICAgY2FzZSAweEZGNDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NZO1xuICAgICAgICAgICAgY2FzZSAweEZGNDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NYO1xuICAgICAgICAgICAgY2FzZSAweEZGNDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGluZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Vua25vd24gYWRkcmVzcyBwYXNzZWQgdG8gR1BVIHJlYWQgZnVuY3Rpb247JywgYDB4JHthZGRyZXNzLnRvU3RyaW5nKDE2KX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3cml0ZShhZGRyZXNzLCB2YWx1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ3B1IHdyaXRlIScpO1xuICAgICAgICBzd2l0Y2ggKGFkZHJlc3MpIHtcbiAgICAgICAgICAgIGNhc2UgMHhGRjQwOlxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoQkcgPSAhISh2YWx1ZSAmIDB4MDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmdNYXAgPSAhISh2YWx1ZSAmIDB4MDgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmdUaWxlID0gISEodmFsdWUgJiAweDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaExDRCA9ICEhKHZhbHVlICYgMHg4MCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDB4RkY0MjpcbiAgICAgICAgICAgICAgICB0aGlzLnNjWSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAweEZGNDM6XG4gICAgICAgICAgICAgICAgdGhpcy5zY1ggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMHhGRjQ3OlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoKHZhbHVlID4+IChpICogMikpICYgMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFsZXR0ZVtpXSA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFsZXR0ZVtpXSA9IFsxOTIsIDE5MiwgMTkyLCAyNTVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFsZXR0ZVtpXSA9IFs5NiwgOTYsIDk2LCAyNTVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFsZXR0ZVtpXSA9IFswLCAwLCAwLCAyNTVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5rbm93biBhZGRyZXNzIHBhc3NlZCB0byBHUFUgcmVhZCBmdW5jdGlvbjsnLCBgMHgke2FkZHJlc3MudG9TdHJpbmcoMTYpfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRpY2soKSB7XG4gICAgICAgIHRoaXMubW9kZUNsb2NrID0gdGhpcy5jcHUuY2xvY2suTTtcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgR1BVTW9kZS5IT1JJWk9OVEFMX0JMQU5LLk1PREU6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZUNsb2NrID49IEdQVU1vZGUuSE9SSVpPTlRBTF9CTEFOSy5DTE9DSykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVDbG9jayA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGluZSsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5lID09IEdQVVNldHRpbmdzLkhFSUdIVCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IEdQVU1vZGUuVkVSVElDQUxfQkxBTksuTU9ERTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY3JlZW4gKDIpJywgdGhpcy5zY3JlZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLnNjcmVlbiwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSBHUFVNb2RlLlNDQU5MSU5FX09BTS5NT0RFO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBHUFVNb2RlLlZFUlRJQ0FMX0JMQU5LLk1PREU6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZUNsb2NrID49IEdQVU1vZGUuT05FX0xJTkUuQ0xPQ0spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlQ2xvY2sgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmUrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGluZSA+IDE1Mykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gR1BVTW9kZS5TQ0FOTElORV9PQU0uTU9ERTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEdQVU1vZGUuU0NBTkxJTkVfT0FNLk1PREU6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZUNsb2NrID49IEdQVU1vZGUuU0NBTkxJTkVfT0FNLkNMT0NLKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZUNsb2NrID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gR1BVTW9kZS5TQ0FOTElORV9WUkFNLk1PREU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBHUFVNb2RlLlNDQU5MSU5FX1ZSQU0uTU9ERTpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlQ2xvY2sgPj0gR1BVTW9kZS5TQ0FOTElORV9WUkFNLkNMT0NLKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZUNsb2NrID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gR1BVTW9kZS5IT1JJWk9OVEFMX0JMQU5LLk1PREU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2NhbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5zY3JlZW4gPSB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKEdQVVNldHRpbmdzLldJRFRILCBHUFVTZXR0aW5ncy5IRUlHSFQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2NyZWVuLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIHRoaXMuc2NyZWVuLmRhdGFbaSArIDBdID0gMjU1O1xuICAgICAgICAgICAgdGhpcy5zY3JlZW4uZGF0YVtpICsgMV0gPSAyNTU7XG4gICAgICAgICAgICB0aGlzLnNjcmVlbi5kYXRhW2kgKyAyXSA9IDI1NTtcbiAgICAgICAgICAgIHRoaXMuc2NyZWVuLmRhdGFbaSArIDNdID0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5zY3JlZW4sIDAsIDApO1xuICAgICAgICB0aGlzLnRpbGVzZXQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLk1BWF9OUl9PRl9USUxFUzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnRpbGVzZXRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5USUxFX1NJWkU7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMudGlsZXNldFtpXVtqXSA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVUaWxlKGFkZHJlc3MsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFkZHIgPSBhZGRyZXNzICYgMHgxRkZFO1xuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlVGlsZTonLCBhZGRyZXNzLCB2YWx1ZSk7XG4gICAgICAgIGNvbnN0IHRpbGUgPSAoYWRkciA+PiA0KSAmIDUxMTtcbiAgICAgICAgY29uc3QgeSA9IChhZGRyID4+IDEpICYgNztcbiAgICAgICAgbGV0IHN4O1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDg7IHgrKykge1xuICAgICAgICAgICAgc3ggPSAxIDw8ICg3IC0geCk7XG4gICAgICAgICAgICB0aGlzLnRpbGVzZXRbdGlsZV1beV1beF0gPSAoKHRoaXMubW11LlZSQU1bYWRkcl0gJiBzeCkgPyAxIDogMCkgKyAoKHRoaXMubW11LlZSQU1bYWRkciArIDFdICYgc3gpID8gMiA6IDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlclNjYW4oKSB7XG4gICAgICAgIGxldCBtYXBPZmZzZXQgPSB0aGlzLmJnTWFwID8gMHgxQzAwIDogMHgxODAwO1xuICAgICAgICBtYXBPZmZzZXQgKz0gKCh0aGlzLmxpbmUgKyB0aGlzLnNjWSkgJiAyNTUpID4+IDM7XG4gICAgICAgIGxldCBsaW5lT2Zmc2V0ID0gKHRoaXMuc2NYID4+IDMpO1xuICAgICAgICB2YXIgeSA9ICh0aGlzLmxpbmUgKyB0aGlzLnNjWSkgJiA3O1xuICAgICAgICB2YXIgeCA9IHRoaXMuc2NYICYgNztcbiAgICAgICAgdmFyIGNhbnZhc09mZnNldCA9IHRoaXMubGluZSAqIDE2MCAqIDQ7XG4gICAgICAgIGxldCBjb2xvcjtcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLm1tdS5WUkFNW21hcE9mZnNldCArIGxpbmVPZmZzZXRdO1xuICAgICAgICBpZiAodGhpcy5iZ1RpbGUgJiYgdGlsZSA8IDEyOClcbiAgICAgICAgICAgIHRpbGUgKz0gMjU2O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2MDsgaSsrKSB7XG4gICAgICAgICAgICBjb2xvciA9IHRoaXMucGFsZXR0ZVt0aGlzLnRpbGVzZXRbdGlsZV1beV1beF1dO1xuICAgICAgICAgICAgdGhpcy5zY3JlZW4uZGF0YVtjYW52YXNPZmZzZXQgKyAwXSA9IGNvbG9yWzBdO1xuICAgICAgICAgICAgdGhpcy5zY3JlZW4uZGF0YVtjYW52YXNPZmZzZXQgKyAxXSA9IGNvbG9yWzFdO1xuICAgICAgICAgICAgdGhpcy5zY3JlZW4uZGF0YVtjYW52YXNPZmZzZXQgKyAyXSA9IGNvbG9yWzJdO1xuICAgICAgICAgICAgdGhpcy5zY3JlZW4uZGF0YVtjYW52YXNPZmZzZXQgKyAzXSA9IGNvbG9yWzNdO1xuICAgICAgICAgICAgY2FudmFzT2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICB4Kys7XG4gICAgICAgICAgICBpZiAoeCA9PSA4KSB7XG4gICAgICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgICAgICAgICAgbGluZU9mZnNldCA9IChsaW5lT2Zmc2V0ICsgMSkgJiAzMTtcbiAgICAgICAgICAgICAgICB0aWxlID0gdGhpcy5tbXUuVlJBTVttYXBPZmZzZXQgKyBsaW5lT2Zmc2V0XTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ1RpbGUgJiYgdGlsZSA8IDEyOClcbiAgICAgICAgICAgICAgICAgICAgdGlsZSArPSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBHUFUgfTtcbiIsImNvbnN0IEdQVU1vZGUgPSB7XG4gICAgSE9SSVpPTlRBTF9CTEFOSzogeyBNT0RFOiAwLCBDTE9DSzogMjA0IH0sXG4gICAgVkVSVElDQUxfQkxBTks6IHsgTU9ERTogMSwgQ0xPQ0s6IDQ1NjAgfSxcbiAgICBTQ0FOTElORV9PQU06IHsgTU9ERTogMiwgQ0xPQ0s6IDgwIH0sXG4gICAgU0NBTkxJTkVfVlJBTTogeyBNT0RFOiAzLCBDTE9DSzogMTcyIH0sXG4gICAgT05FX0xJTkU6IHsgTU9ERTogbnVsbCwgQ0xPQ0s6IDQ1NiB9LFxuICAgIEZVTExfRlJBTUU6IHsgTU9ERTogbnVsbCwgQ0xPQ0s6IDcwMjI0IH1cbn07XG5leHBvcnQgeyBHUFVNb2RlIH07XG4iLCJjbGFzcyBJbnB1dCB7XG59XG5leHBvcnQgeyBJbnB1dCB9O1xuIiwiY2xhc3MgRGVidWcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRlYnVnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlcmlhbE91dHB1dCA9IHtcbiAgICAgICAgICAgIGVudHJpZXM6IFtdLFxuICAgICAgICAgICAgc3RyOiAnJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IHNoYXJlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaGFyZWQpXG4gICAgICAgICAgICB0aGlzLl9zaGFyZWQgPSBuZXcgRGVidWcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZDtcbiAgICB9XG4gICAgcmVhZFNlcmlhbE91dHB1dCgpIHtcbiAgICAgICAgY29uc3QgeyBlbnRyaWVzIH0gPSB0aGlzLnNlcmlhbE91dHB1dDtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZW50cmllc1tlbnRyaWVzLmxlbmd0aCAtIDFdO1xuICAgICAgICBjb25zdCBjaGFyID0gdGhpcy5tbXUucmVhZCgweEZGMDEpO1xuICAgICAgICBjb25zdCBlbmRPZkxpbmUgPSB0aGlzLm1tdS5yZWFkKDB4RkYwMikgPT09IDB4ODE7XG4gICAgICAgIGlmIChjaGFyKVxuICAgICAgICAgICAgdGhpcy5zZXJpYWxPdXRwdXQuc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcik7XG4gICAgICAgIGlmIChlbmRPZkxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VyaWFsT3V0cHV0LmVudHJpZXMucHVzaCh0aGlzLnNlcmlhbE91dHB1dC5zdHIpO1xuICAgICAgICAgICAgdGhpcy5zZXJpYWxPdXRwdXQuc3RyID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGVidWdnaW5nICYmIGVudHJpZXMgJiYgZW50cmllcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgdGhpcy5sb2coJ1NlcmlhbCBJL08gLT4nLCBvdXRwdXQpO1xuICAgIH1cbiAgICBsb2coLi4ubXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoLi4ubXNnKTtcbiAgICB9XG59XG5leHBvcnQgeyBEZWJ1ZyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==