import {useState, useRef, useCallback, useLayoutEffect, useEffect} from 'react';
import { Players } from "tone";

import {LOOP_SECONDS_DURATION,SAMPLE_PADS_CONFIG} from '../constants/app.constants'

import {PadsConfig} from '../types/app.types'


export default function useLooper() {
    const [isAllAudioLoaded, setIsAllAudioLoaded] = useState(false);
    const [isLooperOn, setIsLooperOn] = useState(false);
    const [pads, setPads] = useState<PadsConfig>(SAMPLE_PADS_CONFIG)
    const [elapsedLoopSeconds, setElapsedLoopSeconds] = useState(0);
    
    const audioPlayersRef = useRef<Players>()
    const prevIsLooperOnRef = useRef(isLooperOn);
    const loopIntervalRef = useRef<number>();
    const elapsedLoopSecondsIntervalRef = useRef<number>();
    //keep ref of pads state to prevent stale-state when it is accessed by the loop interval callback
    const padsRef = useRef(pads);
    
    const startLooper = useCallback(()=>setIsLooperOn(true),[])
    const stopLooper = useCallback(()=>setIsLooperOn(false),[])

    const pauseAllActivePads = useCallback(()=>audioPlayersRef?.current?.stopAll(), [])
    
    const playLoop = useCallback(()=>{
        pauseAllActivePads();
        Object.values(padsRef.current).forEach(pad=>{
            if(pad.isActive){
                audioPlayersRef?.current?.player(pad.id).start()
            }
        })
    },[pauseAllActivePads]);

    const togglePad = useCallback((padId: string)=>{
        setPads(prevState=>{
            const nextIsActive = !prevState[padId].isActive;
            if(!nextIsActive){
                audioPlayersRef.current?.player(padId).stop()
            }

            const nextState = {...prevState, [padId]: {...prevState[padId], isActive: nextIsActive}}
            padsRef.current = nextState;

            return nextState;

        })
    },[])

    
    useEffect(function preloadAudioFiles(){
        const playersObject = Object.values(SAMPLE_PADS_CONFIG).reduce((acc: Record<string,string>,{id,src})=>({...acc, [id]: src}),{});

        audioPlayersRef.current = new Players(playersObject, ()=>{
            setIsAllAudioLoaded(true);
        }).toDestination();
        
    },[])

    // use layout effect to ensure synchronous audio updates on loop interval
    useLayoutEffect(function manageLoops(){
        // handle turning the looper on
        if(isLooperOn && !prevIsLooperOnRef.current){
            playLoop()
            loopIntervalRef.current = window.setInterval(playLoop,LOOP_SECONDS_DURATION * 1_000)
            elapsedLoopSecondsIntervalRef.current = window.setInterval(()=>setElapsedLoopSeconds(prev=>(prev+1)%LOOP_SECONDS_DURATION),1_000);
            prevIsLooperOnRef.current = isLooperOn;
        }
        // handle turning the looper off
        if(!isLooperOn && prevIsLooperOnRef.current){
            pauseAllActivePads()
            clearInterval(loopIntervalRef.current)
            clearInterval(elapsedLoopSecondsIntervalRef.current)
            setElapsedLoopSeconds(0);
            prevIsLooperOnRef.current = isLooperOn;
        }

        //cleanup function
        return ()=>{
            clearInterval(loopIntervalRef.current)
            clearInterval(elapsedLoopSecondsIntervalRef.current)
        }

    },[isLooperOn, playLoop, pauseAllActivePads])


  
    
    
  
    return {
      isLooperOn,
      startLooper,
      stopLooper,
      pads,
      togglePad,
      elapsedLoopSeconds,
      isAllAudioLoaded
    };
  }