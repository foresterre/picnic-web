import PicnicClient from "picnic-api";

function buildPicnicClient(req) {
    return new PicnicClient({
        authKey: req.get("x-picnic-auth")
    });
}

export default {
    async setUpRouting(app) {
        app.post("/api/login", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                await picnicClient.login(req.body.username, req.body.password);

                res.send({ authKey: picnicClient.authKey });
            } catch {
                res.sendStatus(500);
            }
        });

        app.get("/api/lists/:depth", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getLists(req.params.depth));
            } catch {
                res.sendStatus(500);
            }
        });

        app.post("/api/lists", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getList(req.body.listId, req.body.subListId, req.body.depth));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.get("/api/categories/:depth", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send((await picnicClient.getCategories(req.params.depth || 0)).catalog);
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.post("/api/suggestions", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getSuggestions(req.body.query));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.post("/api/search", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.search(req.body.query));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.get("/api/cart", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getShoppingCart());
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.post("/api/cart/add", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.addProductToShoppingCart(req.body.productId, 1));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.post("/api/cart/remove", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.removeProductFromShoppingCart(req.body.productId, 1));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.get("/api/product/:productId", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getProduct(req.params.productId));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.post("/api/slot", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.setDeliverySlot(req.body.slotId));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.get("/api/user", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getUserDetails());
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.get("/api/consent", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getConsentSettings());
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.post("/api/consent", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.setConsentSettings([{ consent_request_text_id: req.body.consentId, consent_request_locale: 'nl_NL', agreement: req.body.newVal }]));
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.get("/api/discount", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getMgmDetails());
            } catch {
                res.sendStatus(500);
            }
        });
        
        app.get("/api/deliveries", async (req, res) => {
            let picnicClient = buildPicnicClient(req);

            try {
                res.send(await picnicClient.getDeliveries());
            } catch {
                res.sendStatus(500);
            }
        });
    }
}