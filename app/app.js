new Vue({
    el: '#app',
    data: {
        jogoIniciado: false,
        jogoFinalizado:false,
        endGameMessage:'',
        showLog:false,
        showActions:false,
        playerBarColor: 'green',
        playerBarWidth: 100,
        monsterBarColor: 'green',
        monsterBarWidth: 100,
        logs: [
        ]
    },
    watch: {
        playerBarWidth(newValue, oldValue) {
            if (newValue < 0) {
                this.playerBarWidth = 0
            }
            if (newValue < 20) {
                this.playerBarColor = 'red'
            }
            if (newValue > 100) {
                this.playerBarWidth = 100
            }
            if (this.playerBarWidth  == 0) {
                this.endGame()
            }
        },
        monsterBarWidth(newValue, oldValue) {
            if (newValue < 0) {
                this.monsterBarWidth = 0
            }
            if (newValue < 20) {
                this.monsterBarColor = 'red'
            }
            if (this.monsterBarWidth  == 0) {
                this.endGame()
            }



        }
    },
    methods: {
        ataqueNormal() {
            let playerAttack = this.randomNumber(2, 10)
            let monsterAttack = this.randomNumber(8, 15)
            this.ataque(playerAttack, monsterAttack)
        },
        ataqueEspecial() {
            let playerAttack = this.randomNumber(20, 30)
            let monsterAttack = this.randomNumber(2, 8)
            this.ataque(playerAttack, monsterAttack)
        },
        ataque(playerAttack, monsterAttack) {

            this.monsterBarWidth = this.monsterBarWidth - playerAttack
            this.playerBarWidth = this.playerBarWidth - monsterAttack

            this.logs.push({
                cor: '#848DC7',
                frase: `JOGADOR ANTIGIU MONSTRO COM ${playerAttack}.`
            })
            this.logs.push({
                cor: '#E37778',
                frase: `MONSTRO ANTIGIU JOGADOR COM ${monsterAttack}.`
            })
        },
        randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        startGame(){
            this.jogoIniciado=!this.jogoIniciado
            this.jogoFinalizado=false
            this.showLog=true
            this.showActions=true

            this.zerarGame()
        },
        restartGame() {
            this.jogoIniciado = true
            
            this.zerarGame()

        },
        zerarGame(){
            this.playerBarWidth = 100
            this.playerBarColor = 'green'
            this.monsterBarWidth = 100
            this.monsterBarColor = 'green'
            this.logs = []
        },
        endGame(){
            this.showActions=false
            this.jogoIniciado = false
            this.jogoFinalizado = true
            if (this.monsterBarWidth == 0){
                this.endGameMessage = "Você Ganhou :)"
            }
            if (this.playerBarWidth == 0){
                this.endGameMessage = "Você Perdeu :("
            }
            ;
        },
        cura() {
            let cura = this.randomNumber(5, 13)
            let monsterAttack = this.randomNumber(2, 8)

            this.playerBarWidth = this.playerBarWidth + cura
            this.playerBarWidth = this.playerBarWidth - monsterAttack

            this.logs.push({
                cor: '#848DC7',
                frase: `JOGADOR GANHOU FORÇA DE ${cura}.`
            })
            this.logs.push({
                cor: '#E37778',
                frase: `MONSTRO ANTIGIU JOGADOR COM ${monsterAttack}.`
            })
        },


    },
    computed: {
        playerBarStyle() {
            return {
                width: this.playerBarWidth + '%',
                height: '24px',
                backgroundColor: this.playerBarColor,
            }
        },
        monsterBarStyle() {
            return {
                width: this.monsterBarWidth + '%',
                height: '24px',
                backgroundColor: this.monsterBarColor,
            }
        }
    }
})