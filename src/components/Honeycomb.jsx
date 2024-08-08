import { useEffect, useState, useContext } from 'react';
import { Letter } from './Letter';
import {
    DataContext,
    GuessContext,
    WordContext,
    FoundWordsContext,
    MessagesContext, 
    PuzzleContext,
} from '../contexts/Contexts';
// import { useContext } from 'react';
import { handleWordValidation } from '../utils/handleWordValidation';

export function Honeycomb() {
    const [word, dispatchWord] = useContext(WordContext);
    const data = useContext(DataContext);
    const [guess, dispatchGuess] = useContext(GuessContext);
    const [foundWords, setFoundWords] = useContext(FoundWordsContext);
    const [showMessage, setShowMessage] = useContext(MessagesContext);
    const puzzle = useContext(PuzzleContext)
    const [isOpen, setIsOpen] = useState(false)
    const [hintItems, setHintItems] = useState([])
    const [hintCount, setHintCount] = useState(2)
    
    const [randomArr, setRandomArr] = useState([0, 1, 2, 3, 4, 5]);

    const shuffle = () => {
        setRandomArr([...randomArr].sort(() => Math.random() - 0.5));
    };

    const deleteLetter = () => {
        dispatchWord({
            type: 'removeLetter',
        });
    };

    
    const hints = () => {
        let listHints = data.filter(answer => { 
            return answer.puzzle === puzzle[puzzle.length - 1].id
        })
        const filteredListHints = listHints.filter(hint => {
            return !foundWords.includes(hint.word)
        })
        // console.log(filteredListHints)
        const hintItems = filteredListHints.slice(0, 10)
        setHintItems(hintItems)
        setIsOpen(true)
    }

    const increaseHintLevel = (e) => {
        e.stopPropagation()
        if(hintCount <= 3) {
            setHintCount(prevHintCount => prevHintCount + 1)
        }
    }

    const enter = () => {
        handleWordValidation(
            word,
            setShowMessage,
            data,
            puzzle,
            foundWords,
            setFoundWords,
            dispatchGuess
        )
    };



    return (
        <>
            {isOpen ? <section className='hintList bg-yellow-50 border-solid border-2 border-yellow-400' onClick={() => setIsOpen(!isOpen)}>
                <ul>
                    {
                       hintItems.map(hint => <li key={hint.word}>{hint.word.slice(0, hintCount) + "..."}</li>)
                    }
                    <svg className="open-list-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
                    </svg>
                    
                </ul> 
                <button type="button" className="w-full font-black text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={increaseHintLevel}>Increase Hint Level</button>
                
            </section> : ''}

            <article className="honeycomb">
                { puzzle[puzzle.length -1] &&
                    <>
                        <Letter letter={puzzle[puzzle.length - 1].central_letter} isCenter={true} />
                        <Letter letter={puzzle[puzzle.length - 1].characters[randomArr[0]]} isCenter={false} />
                        <Letter letter={puzzle[puzzle.length - 1].characters[randomArr[1]]} isCenter={false} />
                        <Letter letter={puzzle[puzzle.length - 1].characters[randomArr[2]]} isCenter={false} />
                        <Letter letter={puzzle[puzzle.length - 1].characters[randomArr[3]]} isCenter={false} />
                        <Letter letter={puzzle[puzzle.length - 1].characters[randomArr[4]]} isCenter={false} />
                        <Letter letter={puzzle[puzzle.length - 1].characters[randomArr[5]]} isCenter={false} />
                    </>
                }
            </article>
            <section className="buttons">
                <button className="button" onClick={deleteLetter}>
                    Delete
                </button>
                <button className="button shuffle" onClick={shuffle}>
                     <svg className="shuffle-icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.19306266,7 L10,7 L10,9 L3,9 L3,2 L5,2 L5,5.27034886 C6.72510698,3.18251178 9.19576641,2 12,2 C17.5228475,2 22,6.4771525 22,12 C20,12 22,12 20,12 C20,7.581722 16.418278,4 12,4 C9.60637619,4 7.55353989,5.07869636 6.19306266,7 Z M17.8069373,17 L14,17 L14,15 L21,15 L21,22 L19,22 L19,18.7296511 C17.274893,20.8174882 14.8042336,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,12 4,12 4,12 C4,16.418278 7.581722,20 12,20 C14.3936238,20 16.4464601,18.9213036 17.8069373,17 Z" fillRule="evenodd"/></svg>
                </button>
                <button className="button" onClick={enter}>
                    Enter
                </button>
                <button className="button" onClick={hints}>
                    Hints
                </button>
                
            </section>
        </>
    );
}
