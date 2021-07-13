function fetchResourse(body, url, method,goto) {
        loadingState(submit,true)
        fetch(url, {
                    method,
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(res => {
                        let redirectUrl = res.goto;

                        loadingState(submit,false)
                        if (res.status) {
                            swal({
                            title: res.message,
                            text: res.text && res.text,
                            icon:"success"
                            }).then(() => {
                               
                                if (goto === "noload") {
                            return
                                } else if (goto === "reload") {
                                    window.location.reload()
                                }  else {
                                   window.location.href = redirectUrl
                                }
                    })
                        } else {
                            swal({
                            title: res.message,
                            text: res.text && res.text,
                            icon:"error"
                    })
                        }
                    }).catch(err => {
                        loadingState(submit,false)
                    swal({
                            title: err.message,
                            text: res.text && res.text,
                            icon:"error"
                    })
                    })
}

function loadingState(element, state) {
        if (state) {
            cbText = element.textContent;
            element.innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
  }