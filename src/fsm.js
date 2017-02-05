    class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		if(typeof(config)=='undefined') throw new Error('ощибкааа');
		else {
		this.config=config;
		this.current=this.config.initial;
		this.current2=this.current;
		}
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
		return this.current;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		if(state in this.config.states) {
		this.prev=this.current;
		this.current=state;	
		}
		else throw new Error('нет такого состояния');
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		var t=this.current;
		if(event in this.config.states[t].transitions){
			this.prev=this.current;
			this.current=this.config.states[t].transitions[event];
		}
		else throw new Error('ошибка');
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.current=this.config.initial;
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		var l=[];
		if(typeof(event)=='undefined') return  l=['normal','busy','hungry','sleeping'];
		else {
			if(event in this.config.states.normal.transitions) l.push('normal');
			if(event in this.config.states.busy.transitions) l.push('busy');
			if(event in this.config.states.hungry.transitions) l.push('hungry');
			if(event in this.config.states.sleeping.transitions) l.push('sleeping');
			return l;
		}
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		if(typeof(this.prev)!='undefined'){
			this.current2=this.current;
			this.current=this.prev;
			this.prev=undefined;
			return true;
		}
		return false;
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		if(this.current!=this.current2) {
			this.current=this.current2;
			return true;
		}
		else return false;
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		this.current2=undefined;
		this.prev=undefined;
		this.current=undefined;
	}
}

module.exports = FSM;
