  export type SampleAudioPad = {
      id: string,
      src: string,
      isActive: boolean,
      color: string
  }


  export type PadsConfig = {
      [id: string]: SampleAudioPad
  }
