import React, { Children, isValidElement, cloneElement, ReactNode, ReactElement } from 'react';

interface SmartTextProps {
    children: ReactNode;
}

const ORPHANS_LIST = [
    'a', 'i', 'o', 'u', 'w', 'z',
    'na', 'do', 'po', 'od', 'za', 'ku', 'we', 'ze', 'be', 'dla', 'nad', 'pod', 'przy', 'bez', 'przez',
    'ale', 'czy', 'jak', 'nie', 'tak', 'bo', 'że', 'niż', 'gdy', 'lecz', 'lub', 'mimo', 'oraz', 'stąd', 'tam', 'tzn', 'tudzież',
    'ja', 'ty', 'my', 'wy', 'ci', 'mi', 'mu', 'go', 'ją', 'je', 'ma',
    'ten', 'ta', 'to', 'te', 'tę', 'tym', 'tą', 'tu', 'ów', 'owa', 'owe', 'oto',
    'kto', 'co', 'ktoś', 'coś', 'gdzie', 'kiedy', 'skąd', 'dokąd', 'jakże', 'wszystko',
    'są', 'się', 'jest', 'był', 'będzie',
    'a', 'an', 'the',
    'and', 'but', 'or', 'nor', 'for', 'yet', 'so', 'as', 'if', 'than',
    'although', 'though', 'tho', 'while', 'because', 'cuz', 'cos', 'since', 'unless', 'until', 'til', 'whereas',
    'both', 'either', 'neither', 'whether',
    'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via', 'per', 'vs', 'out', 'off',
    'with', 'w', 'from', 'into', 'onto', 'upon', 'over', 'under', 'below', 'above',
    'before', 'after', 'between', 'among', 'against', 'during', 'without', 'within', 'through', 'thru', 'about',
    'I', 'me', 'my', 'mine', 'myself',
    'you', 'u', 'your', 'ur', 'yours', 'yourself',
    'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself',
    'we', 'us', 'our', 'ours', 'ourselves',
    'they', 'them', 'their', 'theirs', 'themselves',
    'this', 'that', 'these', 'those',
    'who', 'whom', 'whose', 'which', 'what', 'where', 'when', 'why', 'how',
    'is', 'are', 'r', 'was', 'were', 'be', 'been', 'being',
    'has', 'have', 'had',
    'do', 'does', 'did', 'done',
    'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must',
    'gonna', 'wanna', 'gotta',
    "don't", "dont", "won't", "wont", "can't", "cant", "shouldn't", "shouldnt",
    "it's", "its", "i'm", "im", "you're", "youre", "we're", "were", "they're", "theyre",
    "didn't", "didnt", "isn't", "isnt", "aren't", "arent", "wasn't", "wasnt", "weren't", "werent",
    "hasn't", "hasnt", "haven't", "havent",
    'not', 'no', 'yes', 'yep', 'nope', 'now', 'then', 'here', 'there', 'ok'
];

const ORPHANS_SET = new Set(ORPHANS_LIST.map(w => w.toLowerCase()));

const TITLES_LIST = [
    'ul', 'al', 'pl', 'os', 'dr', 'mgr', 'inż', 'prof', 'doc', 'hab',
    'gen', 'płk', 'mjr', 'kpt', 'ks', 'bp', 'abp', 'św', 'śp',
    'red', 'art', 'ust', 'poz', 'tj', 'np', 'itd', 'itp', 'tzw',
    'mr', 'mrs', 'ms', 'mx', 'dr', 'prof', 'st', 'sgt', 'capt', 'gen', 'col', 'lt', 'hon', 'rev', 'est', 'vol', 'no', 'fig', 'vs'
];
const TITLES_PATTERN = Array.from(new Set(TITLES_LIST)).join('|');
const TITLES_REGEX = new RegExp(`(\\s|^)(${TITLES_PATTERN})(\\.?\\s+)`, 'gi');

const DASH_REGEX = /(\s)(-|–|—)(\s+)/g;
const NUMBER_UNIT_REGEX = /(\d+)(\s+)([\w%°€$£]+)/g;

const processText = (text: string): string => {
    if (!text) return text;

    const processed = text
        .replace(NUMBER_UNIT_REGEX, '$1\u00A0$3')
        .replace(TITLES_REGEX, (match, prefix, title, suffix) => {
            return `${prefix}${title}${suffix.replace(/\s+/, '\u00A0')}`;
        })
        .replace(DASH_REGEX, '\u00A0$2$3');

    const tokens = processed.split(/(\s+)/);

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.trim().length > 0 && ORPHANS_SET.has(token.toLowerCase())) {
            if (i + 1 < tokens.length) {
                const nextToken = tokens[i + 1];
                if (/^ +$/.test(nextToken)) {
                    tokens[i + 1] = '\u00A0';
                }
            }
        }
    }

    return tokens.join('');
};

export const SmartText: React.FC<SmartTextProps> = ({ children }) => {
    const processNode = (node: ReactNode): ReactNode => {
        if (typeof node === 'string') {
            return processText(node);
        }

        if (Array.isArray(node)) {
            return Children.map(node, processNode);
        }

        if (isValidElement(node)) {
            const element = node as ReactElement<{ children?: ReactNode } & Record<string, unknown>>;
            const elementChildren = element.props.children;

            if (elementChildren) {
                return cloneElement(element, {
                    ...element.props,
                    children: processNode(elementChildren)
                });
            }
            return node;
        }

        return node;
    };

    return <>{processNode(children)}</>;
};