// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {jsonHighlighting} from "./highlight"
export const parser = LRParser.deserialize({
  version: 14,
  states: "'[OVQPOOOOQO'#Cb'#CbOqQPO'#CeO!SQPO'#CqOOQO'#Cw'#CwQOQPOOOOQO'#Cg'#CgO!ZQPO'#CfOOQO'#Ci'#CiO!`QPO'#ChO!eQPO'#C|OOQO'#C{'#C{O!sQPO,59YO#OQPO,59PO#TQPO'#DTOOQO,59],59]O#]QPO,59]OVQPO,59QOVQPO,59SO#bQPO'#CrO#jQPO,59hOOQO'#Ck'#CkO#xQPO'#CjOOQO'#Cm'#CmO#}QPO'#ClO$SQPO,59fO$bQPO'#DSO$mQPO,59fOOQO1G.t1G.tOOQO1G.k1G.kOVQPO'#CsO$xQPO,59oOOQO1G.w1G.wOOQO1G.l1G.lOOQO1G.n1G.nOOQO,59^,59^OOQO-E6p-E6pOVQPO,59UOVQPO,59WO%QQPO1G/QO%YQPO,59nOOQO1G/Q1G/QOOQO,59_,59_OOQO-E6q-E6qOOQO1G.p1G.pOOQO1G.r1G.rOOQO1G/V1G/VOOQO1G/Y1G/Y",
  stateData: "%e~OjOS~OQSORSOSSOTSOWQOdROlPOmPO~OlWOmUOVoPtoPuoP~Oc_O~PVOqaO~OqbO~OrcOVpXtpXupX~OVlOteOugO~OVmO~OrnOcwX~OcpO~OlWOmUO~OrcOVpatpaupa~OquO~OqvO~OlWOmUOVoPuoP~OlWOmUOtoP~OlWOmUOVoP~OrnOcwa~OugOVni~OteO~Otumlm~",
  goto: "$_xPPPPPPyPPy!S!]!S!d!k!q!u!{yPPy#P#VPPP#]PP#r#u$RPP$XPP$X$[_SORabnuvWYQijkRscZVQcijkZXQcijkQi[R!PxTf[xQj[R!OwTh[wQdYRtdQo^R{oQTOQ^RQqaQrbQznQ|uR}vR]QQ[QQwiQxjRykXZQijkRk[R`R",
  nodeNames: "⚠ JsonText True False Null Number String } { Component GraphicProperty GraphicPropertyName Property PropertyName ComponentTypeProperty ComponentTypePropertyName ChildrenProperty ChildrenPropertyName Object ] [ Array",
  maxTerm: 39,
  nodeProps: [
    ["openedBy", 7,"{",19,"["],
    ["closedBy", 8,"}",20,"]"]
  ],
  propSources: [jsonHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 2,
  tokenData: "=a~RaXY!WYZ!W]^!Wpq!Wrs!]|}9Y}!O9_!Q!R9h!R![:v![!];X!}#O;^#P#Q;c#Y#Z;h#b#c<V#h#i<n#o#p=V#q#r=[~!]Oj~~!`[pq#Uqr#Urs#qs#O#U#O#P#v#P#V#U#V#W%n#W#Z#U#Z#[4W#[;'S#U;'S;=`%h<%lO#U~#XWpq#Uqr#Urs#qs#O#U#O#P#v#P;'S#U;'S;=`%h<%lO#U~#vOl~~#yXrs#U!P!Q#U#O#P#U#U#V#U#Y#Z#U#b#c#U#f#g#U#h#i#U#i#j$f~$iR!Q![$r!c!i$r#T#Z$r~$uR!Q![%O!c!i%O#T#Z%O~%RR!Q![%[!c!i%[#T#Z%[~%_R!Q![#U!c!i#U#T#Z#U~%kP;=`<%l#U~%q[pq#Uqr#Urs#qs#O#U#O#P#v#P#[#U#[#]&g#]#c#U#c#d+i#d;'S#U;'S;=`%h<%lO#U~&jYpq#Uqr#Urs#qs#O#U#O#P#v#P#]#U#]#^'Y#^;'S#U;'S;=`%h<%lO#U~']Ypq#Uqr#Urs#qs#O#U#O#P#v#P#`#U#`#a'{#a;'S#U;'S;=`%h<%lO#U~(OYpq#Uqr#Urs#qs#O#U#O#P#v#P#W#U#W#X(n#X;'S#U;'S;=`%h<%lO#U~(qYpq#Uqr#Urs#qs#O#U#O#P#v#P#f#U#f#g)a#g;'S#U;'S;=`%h<%lO#U~)dYpq#Uqr#Urs#qs#O#U#O#P#v#P#X#U#X#Y*S#Y;'S#U;'S;=`%h<%lO#U~*VYpq#Uqr#Urs#qs#O#U#O#P#v#P#b#U#b#c*u#c;'S#U;'S;=`%h<%lO#U~*xWpq#Uqr#Urs+bs#O#U#O#P#v#P;'S#U;'S;=`%h<%lO#U~+iOu~l~~+lYpq#Uqr#Urs#qs#O#U#O#P#v#P#a#U#a#b,[#b;'S#U;'S;=`%h<%lO#U~,_Ypq#Uqr#Urs#qs#O#U#O#P#v#P#d#U#d#e,}#e;'S#U;'S;=`%h<%lO#U~-QYpq#Uqr#Urs#qs#O#U#O#P#v#P#c#U#c#d-p#d;'S#U;'S;=`%h<%lO#U~-sYpq#Uqr#Urs#qs#O#U#O#P#v#P#b#U#b#c.c#c;'S#U;'S;=`%h<%lO#U~.fYpq#Uqr#Urs#qs#O#U#O#P#v#P#X#U#X#Y/U#Y;'S#U;'S;=`%h<%lO#U~/XYpq#Uqr#Urs#qs#O#U#O#P#v#P#b#U#b#c/w#c;'S#U;'S;=`%h<%lO#U~/zYpq#Uqr#Urs#qs#O#U#O#P#v#P#h#U#h#i0j#i;'S#U;'S;=`%h<%lO#U~0mYpq#Uqr#Urs#qs!v#U!v!w1]!w#O#U#O#P#v#P;'S#U;'S;=`%h<%lO#U~1`Ypq#Uqr#Urs#qs#O#U#O#P#v#P#m#U#m#n2O#n;'S#U;'S;=`%h<%lO#U~2RYpq#Uqr#Urs#qs#O#U#O#P#v#P#d#U#d#e2q#e;'S#U;'S;=`%h<%lO#U~2tYpq#Uqr#Urs#qs#O#U#O#P#v#P#X#U#X#Y3d#Y;'S#U;'S;=`%h<%lO#U~3gWpq#Uqr#Urs4Ps#O#U#O#P#v#P;'S#U;'S;=`%h<%lO#U~4WOt~l~~4ZYpq#Uqr#Urs#qs#O#U#O#P#v#P#f#U#f#g4y#g;'S#U;'S;=`%h<%lO#U~4|Ypq#Uqr#Urs#qs#O#U#O#P#v#P#T#U#T#U5l#U;'S#U;'S;=`%h<%lO#U~5oYpq#Uqr#Urs#qs#O#U#O#P#v#P#d#U#d#e6_#e;'S#U;'S;=`%h<%lO#U~6bYpq#Uqr#Urs#qs#O#U#O#P#v#P#[#U#[#]7Q#];'S#U;'S;=`%h<%lO#U~7TYpq#Uqr#Urs#qs#O#U#O#P#v#P#]#U#]#^7s#^;'S#U;'S;=`%h<%lO#U~7vYpq#Uqr#Urs#qs#O#U#O#P#v#P#V#U#V#W8f#W;'S#U;'S;=`%h<%lO#U~8iWpq#Uqr#Urs9Rs#O#U#O#P#v#P;'S#U;'S;=`%h<%lO#U~9YOm~l~~9_Or~~9bQ!Q!R9h!R![:v~9mRT~!O!P9v!g!h:[#X#Y:[~9yP!Q![9|~:RRT~!Q![9|!g!h:[#X#Y:[~:_R{|:h}!O:h!Q![:n~:kP!Q![:n~:sPT~!Q![:n~:{ST~!O!P9v!Q![:v!g!h:[#X#Y:[~;^Oq~~;cOd~~;hOc~~;kP#T#U;n~;qP#`#a;t~;wP#g#h;z~;}P#X#Y<Q~<VOR~~<YP#i#j<]~<`P#`#a<c~<fP#`#a<i~<nOS~~<qP#f#g<t~<wP#i#j<z~<}P#X#Y=Q~=VOQ~~=[OW~~=aOV~",
  tokenizers: [0],
  topRules: {"JsonText":[0,1]},
  tokenPrec: 199
})
