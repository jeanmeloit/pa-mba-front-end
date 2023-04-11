#!make

USERNAME?="gr3m6keec5b3/oracleidentitycloudservice/equiplanoweb@equiplano.com.br"
NAMESPACE?=equiplano
CLUSTER_NAME?=dev-microservicos
KUBE_CONFIG="$$(echo ~/.kube)"
VERSION?=latest
DOCKER_REGISTRY?=
COMPARTMENT_ID?=ocid1.compartment.oc1..aaaaaaaa3za5fwmpnwil6uz45nktyqpuiszpfjv7zobv7iq4hdtodlp43jxq
APP_NAME?="boilerplate"

docker-login:
	docker login https://sa-saopaulo-1.ocir.io -u $(USERNAME) -p j4u#X7]LK3EusVDiYEIb

#efetuar o build da aplicação
build:docker-login
	@echo "App sem build.."

#efetua limpeza dos artefatos gerados pelo build
clean:docker-login
	@echo "App sem clean.."

#executa o testes da aplicação
test:docker-login
	@echo "App sem clean.."

#efetua o deploy da aplicação no namespace informado pelo parâmetro NAMESPACE, no Kubernetes em que você está logado
deploy:
	env | grep -E "OCI|KUBERNETES" > environments.env
	docker run -t --rm -v $(pwd):/apps --env-file=$(pwd)/environments.env -v $(KUBE_CONFIG):/home/equiplano/.kube -v $(OCI_CONFIG):/home/equiplano/.oci $(DOCKER_REGISTRY)/ocr:latest helm upgrade -i $(APP_NAME) /apps/etc/helm/$(APP_NAME) --namespace $(NAMESPACE) -f /apps/etc/helm/$(APP_NAME)/$(CLUSTER_NAME)-values.yaml
	rm environments.env

#efetua o build da imagem da aplicação
build-image:
	docker build --build-arg ENV=$(ENV) --network=host -t $(DOCKER_REGISTRY)/$(ENV)/$(APP_NAME):$(VERSION) .

#envia a imagem da aplicação para o ECR (repositorio docker OCI)
push-image: docker-login build-image
	docker push $(DOCKER_REGISTRY)/$(ENV)/$(APP_NAME):$(VERSION)

#cria o repositório para a imagem da aplicação no ECR (repositorio docker OCI)
create-docker-repo:
	-@oci artifacts container repository create --display-name devops/$(ENV)/$(APP_NAME) --compartment-id $(COMPARTMENT_ID)
