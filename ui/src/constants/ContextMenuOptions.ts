// constants/contextMenuOptions.ts

/**
 * Submenu structure for context menu
 */
export interface SubMenu {
    label: string;
    subOptions: string[];
}

/**
 * Main menu options for note context menu
 */
export const CONTEXT_MENU_OPTIONS: SubMenu[] = [
    {
        label: 'Intervals',
        subOptions: [
            'Прима',
            'Секунда малая',
            'Секунда большая',
            'Терция малая',
            'Терция большая',
            'Кварта',
            'Тритон',
            'Квинта',
            'Секста малая',
            'Секста большая',
            'Септима малая',
            'Септима большая',
            'Октава',
            'Нона малая',
            'Нона большая',
            'Децима малая',
            'Децима большая',
        ]
    },
    {
        label: 'Chords',
        subOptions: [
            'Минорное трезвучие',    // Minor triad
            'Мажорное трезвучие',    // Major triad
        ]
    },
    {
        label: 'Option 3',
        subOptions: [
            'Sub Option 5',
            'Sub Option 6',
            'Sub Option 7',
            'Sub Option 9',
        ]
    },
];