export class MessageAlertModel {
    constructor(
        public message: string,
        public type: 'mensaje' | 'pregunta',
        public trueMsg?: string,
        public falseMsg?: string,
        public confirmation?: boolean,
    ){}
}

export class PreguntaAlertaModel {
    constructor(
        public mensaje: string,
        public respTrue?: string,
        public respFalse?: string
    ){}
}

export class ErrorAlertModel {
    constructor (
        public mensaje: string,
        public systemError: string  
    ){}
}