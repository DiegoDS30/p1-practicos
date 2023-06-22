let datos_usuarios = sistema.invitados
let lista_censados = document.getElementById('lista-censados')

for (let i = 1; i < DEPARTAMENTOS.length; i++) {

        let tr = document.createElement('tr')
        let td_departamento = document.createElement('td')
        let td_estudiante = document.createElement('td')
        let td_no_trabajan = document.createElement('td')
        let td_trabajan = document.createElement('td')
        let td_total = document.createElement('td')

        let total_departamento = datos_usuarios.filter(usuario => usuario.departamento == DEPARTAMENTOS[i]).length

        td_departamento.innerHTML = DEPARTAMENTOS[i]
        td_estudiante.innerHTML = datos_usuarios.filter(usuario => usuario.departamento == DEPARTAMENTOS[i] && usuario.ocupacion == "Estudiante").length
        td_no_trabajan.innerHTML = datos_usuarios.filter(usuario => usuario.departamento == DEPARTAMENTOS[i] && usuario.ocupacion == "No trabaja").length
        td_trabajan.innerHTML = datos_usuarios.filter(usuario => usuario.departamento == DEPARTAMENTOS[i] && (usuario.ocupacion == "Dependiente" || usuario.ocupacion == "Independiente")).length
        td_total.innerHTML = `${Math.round((total_departamento / datos_usuarios.length) * 100)}%`
        
        lista_censados.appendChild(tr)
        tr.appendChild(td_departamento)
        tr.appendChild(td_estudiante)
        tr.appendChild(td_no_trabajan)
        tr.appendChild(td_trabajan)
        tr.appendChild(td_total)

    
}