const { createApp } = Vue;

createApp({
    data() {
        return {
            alumnos: [],
            busqueda: '', 
            codigo: '',
            nombre: '',
            direccion: '',
            municipio: '',
            departamento: '',
            telefono: '',
            email: '',
            fechaNacimiento: '',
            sexo: ''
        }
    },
    computed: {
        alumnosFiltrados() {
            return this.alumnos.filter(alumno => {
                const query = this.busqueda.toLowerCase(); 
                return (
                    alumno.codigo.toLowerCase().includes(query) ||
                    alumno.nombre.toLowerCase().includes(query) ||
                    alumno.direccion.toLowerCase().includes(query) ||
                    alumno.municipio.toLowerCase().includes(query) ||
                    alumno.departamento.toLowerCase().includes(query) ||
                    alumno.telefono.toLowerCase().includes(query) ||
                    alumno.email.toLowerCase().includes(query) ||
                    alumno.fechaNacimiento.toLowerCase().includes(query) ||
                    alumno.sexo.toLowerCase().includes(query)
                );
            });
        }
    },
    methods: {
        eliminarAlumno(alumno) {
            if (confirm(`¿Está seguro de eliminar el alumno ${alumno.nombre}?`)) {
                localStorage.removeItem(alumno.codigo);
                this.listarAlumnos();
                this.limpiarCampos();  
            }
        },
        verAlumno(alumno) {
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.municipio = alumno.municipio;
            this.departamento = alumno.departamento;
            this.telefono = alumno.telefono;
            this.email = alumno.email;
            this.fechaNacimiento = alumno.fechaNacimiento;
            this.sexo = alumno.sexo;
        },
        guardarAlumno() {
            if (!this.sexo) {
                alert("Por favor, seleccione el sexo del alumno.");
                return;
            }
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                municipio: this.municipio,
                departamento: this.departamento,
                telefono: this.telefono,
                email: this.email,
                fechaNacimiento: this.fechaNacimiento,
                sexo: this.sexo
            };
            localStorage.setItem(this.codigo, JSON.stringify(alumno));
            this.listarAlumnos();
            this.limpiarCampos();  
        },
        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                this.alumnos.push(JSON.parse(valor));
            }
        },
        limpiarCampos() {
            this.codigo = '';
            this.nombre = '';
            this.direccion = '';
            this.municipio = '';
            this.departamento = '';
            this.telefono = '';
            this.email = '';
            this.fechaNacimiento = '';
            this.sexo = '';
        }
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');

