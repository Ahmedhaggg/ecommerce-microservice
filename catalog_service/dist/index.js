"use strict";
// import expressApp from "./express";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// const PORT = process.env.APP_PORT || 8000;
// expressApp.listen(PORT);
// function Logger() {
// 	return (target: any, method: string, describter: PropertyDescriptor) => {
// 		const val = describter.value;
// 		describter.value = function (value: any) {
// 			console.log(value.name, value.email);
// 			return val.apply(this, value);
// 		};
// 	};
// }
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
__decorate([
    enumerable(false)
], Greeter.prototype, "greet", null);
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
const greater = new Greeter("greater");
greater.greet();
