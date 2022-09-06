import React, { useState, useEffect } from "react";
//Imports material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import {RegistroService} from '../services/RegistroService'

export default function Formulario(props) {

    const registroService = new RegistroService();
    const [tipoDoc, setTipoDoc] = useState('');
    const [nroDoc, setNroDoc] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [edad, setEdad] = useState('');
    const [iglesia, setIglesia] = useState('');
    const [otraIglesia, setOtraIglesia] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [isDisabledIglesia, setIsDisabledIglesia] = useState(true);
    const [menuItemTipoDoc, setMenuItemTipoDoc] = useState('');
    const [evento, setEvento] = useState('');

    
    var arrayTipoDocumento = []

    const handleChangeTipoDoc = (event) => {
        setTipoDoc(event.target.value);
    };

    const handleChangeIglesia = (event) => {
        setIglesia(event.target.value);
        if(event.target.value=="Otra"){
            setIsDisabledIglesia(false)
        }else{
            setIsDisabledIglesia(true)
            setOtraIglesia("")
        }
    };

    async function reloadDataConfig() {
        const tipoDocumentoResponse =  await registroService.getAllTipoDocumento();
        arrayTipoDocumento = await tipoDocumentoResponse.data;
        setMenuItemTipoDoc(
            arrayTipoDocumento.map((tp) => {
                return(
                    <MenuItem value={tp.id}>{tp.descripcion}</MenuItem>
                )
            })
        )

        const eventoResponse =  await registroService.getEvento();
        const eventoResponseData  = await eventoResponse.data;
        setEvento(eventoResponseData.id)
    }

    async function registrarMaker(event) {
        event.preventDefault();
        var iglesiaRegistro = iglesia
        if(iglesia=="Otra"){
            iglesiaRegistro = otraIglesia
        }


        const dataFormMaker = {
            id_tipo_doc: tipoDoc,
            nro_doc: nroDoc,
            nombre: nombres,
            apellido: apellidos,
            ciudad: ciudad,
            edad: edad,
            iglesia: iglesiaRegistro,
            celular: celular,
            email: email,
            id_evento: evento
        }
        
        const makerResponse =  await registroService.createMakerBack(dataFormMaker);
        if (makerResponse.status === 200){
            const makerResponseData = await makerResponse.data; 
            if(makerResponseData.status=="ok"){
                props.setIsCreated(true)
                props.setCodigoQr(makerResponseData.codigo_qr)
                props.setName(makerResponseData.nombres_apellidos)
            }
        }
    }

    
    
    useEffect(() => {
        reloadDataConfig();
    }, [,]);
    
    return(
        <Box component="form" onSubmit={registrarMaker} sx={{ mt: 1 }}>
            
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h4" gutterBottom>
                        FORMULARIO DE REGISTRO
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="caption" display="block" >
                        Regístrate llenando el siguiente formularo y sigue las indicaciones para obtener tu credencial para Congreso Hacedores 2022.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="caption" display="block" >
                        Recuerda asistir temprano para asegurar tu lugar en cada conferencia.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Tipo de documento</InputLabel>
                        <Select
                            required
                            labelId="tipo-doc-label"
                            id="tipo-doc-select"
                            value={tipoDoc}
                            label="Tipo de documento"
                            onChange={handleChangeTipoDoc}
                            fullWidth
                        >
                            {menuItemTipoDoc}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        margin="dense"
                        id="nroDoc"
                        label="Nro. Documento"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={nroDoc}
                        onChange={(e) => setNroDoc(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        required
                        margin="dense"
                        id="celular"
                        label="Celular"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                    />
                </Grid>
                
                <Grid item xs={12} sm={6} md={5}>
                    <TextField
                        required
                        margin="dense"
                        id="nombre"
                        label="Nombres"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <TextField
                        required
                        margin="dense"
                        id="apellidos"
                        label="Apellidos"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        required
                        margin="dense"
                        id="edad"
                        label="Edad"
                        type="number"
                        variant="standard"
                        fullWidth
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Iglesia</InputLabel>
                        <Select
                            required
                            labelId="iglesia-label"
                            id="iglesia-select"
                            value={iglesia}
                            label="Iglesia"
                            onChange={handleChangeIglesia}
                            fullWidth
                        >
                            <MenuItem value="Casa de Vida">Casa de Vida</MenuItem>
                            <MenuItem value="Otra">Otra</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        disabled={isDisabledIglesia}
                        margin="dense"
                        id="otraIglesia"
                        label="Ingrese nombre de su iglesia"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={otraIglesia}
                        onChange={(e) => setOtraIglesia(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <TextField
                        margin="dense"
                        id="ciudad"
                        label="Ciudad"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        margin="dense"
                        id="email"
                        label="Correo electrónico"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid> 
                <Grid item xs={12} sm={6} md={12}>
                    <Button type="submit" variant="contained" >Registrar</Button>
                </Grid> 
            </Grid>
        </Box>
    )
}