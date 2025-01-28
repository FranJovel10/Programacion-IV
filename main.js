const {createApp} = Vue;

createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            direccion: '',
            municipio: '',
            departamento: '',
            telefono: '',
            fechadenacimiento: '',
            sexo: ''
        }
    },
    methods: {
        guardarAlumno() {
            console.log( 
                this.codigo,
                this.nombre,
                this.direccion,
                this.municipio,
                this.departamento,
                this.telefono,
                this.fechadenacimiento,
                this.sexo
            );
        }
    }
}).mount('#app');