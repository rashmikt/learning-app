"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe('courses.json', () => {
    let courses;
    beforeAll(() => {
        const filePath = path_1.default.join(__dirname, 'courses.json');
        const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
        courses = JSON.parse(fileContent);
    });
    test('courses.json file should contain an array of courses', () => {
        expect(Array.isArray(courses)).toBe(true);
        expect(courses.length).toBeGreaterThan(0);
    });
    test('Each course should have required fields: id, title, description, and modules', () => {
        courses.forEach(course => {
            expect(course).toHaveProperty('id');
            expect(typeof course.id).toBe('number');
            expect(course).toHaveProperty('title');
            expect(typeof course.title).toBe('string');
            expect(course).toHaveProperty('description');
            expect(typeof course.description).toBe('string');
            expect(course).toHaveProperty('modules');
            expect(Array.isArray(course.modules)).toBe(true);
        });
    });
    test('Each module should have required fields: title and lessons', () => {
        courses.forEach(course => {
            course.modules.forEach(module => {
                expect(module).toHaveProperty('title');
                expect(typeof module.title).toBe('string');
                expect(module).toHaveProperty('lessons');
                expect(Array.isArray(module.lessons)).toBe(true);
            });
        });
    });
    test('Each lesson should have required fields: title, description, topics, and content', () => {
        courses.forEach(course => {
            course.modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    expect(lesson).toHaveProperty('title');
                    expect(typeof lesson.title).toBe('string');
                    expect(lesson).toHaveProperty('description');
                    expect(typeof lesson.description).toBe('string');
                    expect(lesson).toHaveProperty('topics');
                    expect(Array.isArray(lesson.topics)).toBe(true);
                    lesson.topics.forEach(topic => {
                        expect(typeof topic).toBe('string');
                    });
                    expect(lesson).toHaveProperty('content');
                    expect(Array.isArray(lesson.content)).toBe(true);
                });
            });
        });
    });
});
